import 'es6-symbol/implement';
import api from './../utils/api';
import { IsJsonString } from './../utils';
import { parse, stringify } from 'query-string';
import { API_URL, API_REQUEST_TIMEOUT } from 'react-native-dotenv';

const getOidcData = state => (state.user ? state.user.oidc : null);
const getAccessToken = state => {
  const oidcData = getOidcData(state);
  return oidcData ? oidcData.id_token || '' : '';
};

export const getEndpointToCall = endpoint => {
  if (refresh) {
    const parts = endpoint.split('?');
    if (parts.length === 1) {
      return `${endpoint}?refresh=true`;
    }
    const parsedEndpoint = parse(`?${parts[1]}`);
    parsedEndpoint.refresh = true;
    return `${parts[0]}?${stringify(parsedEndpoint)}`;
  }
  return endpoint;
};

export const getMethod = (method = 'get') => {
  switch (method) {
    case 'post':
      return { httpMethod: api().post, hasData: true };
    case 'put':
      return { httpMethod: api().put, hasData: true };
    case 'patch':
      return { httpMethod: api().patch, hasData: true };
    case 'delete':
      return { httpMethod: api().delete, hasData: false };
    default:
      return { httpMethod: api().get, hasData: false };
  }
};

// Fetches an API response and normalizes the result JSON
export const callApi = async (
  store,
  endpoint,
  method = 'get',
  data = undefined
) => {
  //const { httpMethod, hasData } = getMethod(method);
  const accessToken = getAccessToken(store.getState());
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };
  try {
    const response = await fetch(API_URL + endpoint, {
      method,
      headers,
      body: data || undefined,
    });
    const result = await response.json();
    if (result.isError) {
      return Promise.reject(result.error);
    }
    console.log(result);
    return Promise.resolve(result);
    /*const response = await httpMethod(
      API_URL + getEndpointToCall(endpoint, refresh),
      hasData ? JSON.stringify(data) : config,
      hasData ? config : undefined
    );*/
  } catch (err) {
    console.log(err);
    return Promise.reject(JSON.stringify(err));
  }
};

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('Call API');

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  let { endpoint } = callAPI;
  const { method, data } = callAPI;
  const { type, params = {} } = callAPI;

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }
  const keys = Object.keys(type);
  if (!Array.isArray(keys) || keys.length !== 4) {
    throw new Error('Expected an array of three action type.');
  }
  if (!keys.every(type => typeof type === 'string')) {
    throw new Error('Expected action type to be strings.');
  }

  function actionWith(actionData) {
    const finalAction = Object.assign({}, action, actionData);
    delete finalAction[CALL_API];
    return finalAction;
  }

  next(actionWith({ type: type.BEGIN, ...params }));
  return callApi(store, endpoint, method, data).then(
    response =>
      next(
        actionWith({
          response: response.data,
          type: type.SUCCESS,
          ...params,
        })
      ),
    error =>
      next(
        actionWith({
          type: type.ERROR,
          error:
            (IsJsonString(error) ? JSON.parse(error) : error) ||
            'Something bad happened',
          ...params,
        })
      )
  );
};
