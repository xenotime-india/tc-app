import { AUTH_WEB_CLIENT_ID, AUTH0_DOMAIN } from 'react-native-dotenv';
import { AuthSession } from 'expo';
import { AsyncStorage } from 'react-native';

import { PROFILE } from '../actionTypes';
import { LOCAL_STORAGE } from '../../constants';
import api from './../../utils/api';
import { toQueryString, generateRandomValue } from './../../utils/queryUtils';
import {
  auth0Login,
  auth0Refresh,
  isAuthenticated,
} from './../../service/auth';

export const doLogin = (username, password, onLoginSuccess) => {
  return async dispatch => {
    dispatch({ type: PROFILE.LOGIN_STARTED });
    try {
      const result = await auth0Login({ username, password });

      if (result.error) {
        return dispatch({
          type: PROFILE.LOGIN_ERROR,
          error: result.error_description || 'Authentication Failed',
        });
      }
      const { access_token, expires_in, id_token, refresh_token } = result;
      const expiresAt = expires_in * 1000 + new Date().getTime();

      const { data: profile } = await api(id_token).get('/profile');
      if (profile.isError) {
        dispatch({ type: PROFILE.LOGIN_ERROR, error: profile.error });
        onLoginError();
        return;
      }
      // Set the time that the access token will expire at
      await AsyncStorage.setItem(
        LOCAL_STORAGE.TOKEN,
        JSON.stringify({
          access_token,
          id_token,
          expires_in: expiresAt,
        })
      );
      await AsyncStorage.setItem(LOCAL_STORAGE.REFRESH_TOKEN, refresh_token);

      dispatch({
        type: PROFILE.LOGIN_SUCCESS,
        response: { oidc: result, profile },
      });
      onLoginSuccess();
    } catch (ex) {
      console.log(ex);
      dispatch({ type: PROFILE.LOGIN_ERROR });
    }
  };
};

export const verifyLogin = (onLoginSuccess, onLoginError) => {
  return async dispatch => {
    dispatch({ type: PROFILE.LOGIN_STARTED });
    try {
      let userToken = await isAuthenticated();
      console.log('verifyLogin-userToken', userToken);
      if (!userToken) {
        dispatch({ type: PROFILE.LOGIN_ERROR });
        onLoginError();
        return;
      }
      let profile = {};
      try {
        const { data } = await api(userToken.id_token).get('/profile');
        console.log(data);
        if (data.isError) {
          await AsyncStorage.removeItem(LOCAL_STORAGE.TOKEN);
          await AsyncStorage.removeItem(LOCAL_STORAGE.REFRESH_TOKEN);
          dispatch({ type: PROFILE.LOGIN_ERROR, error: data.error });
          onLoginError();
          return;
        }
        profile = data;
      } catch (ex) {
        const refresh_token = await AsyncStorage.getItem(
          LOCAL_STORAGE.REFRESH_TOKEN
        );
        if (refresh_token) {
          userToken = await auth0Refresh({
            refreshToken: refresh_token,
          });
          const { data } = await api(userToken.id_token).get('/profile');
          profile = data;
        } else {
          throw ex;
        }
      }

      dispatch({
        type: PROFILE.LOGIN_SUCCESS,
        response: { oidc: userToken, profile },
      });
      onLoginSuccess();
    } catch (error) {
      dispatch({ type: PROFILE.LOGIN_ERROR, error: error });
      if (onLoginError) {
        onLoginError();
      }
    }
  };
};

export function doRedirectLogin(onLoginSuccess) {
  return dispatch => {
    dispatch({ type: PROFILE.LOGIN_STARTED });
    const redirectUrl = AuthSession.getRedirectUrl();
    console.log('---> Redirect URL: ' + redirectUrl);

    const state = generateRandomValue(); //needed for Okta authentication
    const nonce = generateRandomValue(); //needed for Okta authentication
    return AuthSession.startAsync({
      authUrl:
        `https://${AUTH0_DOMAIN}/authorize` +
        toQueryString({
          client_id: AUTH_WEB_CLIENT_ID,
          response_type: 'id_token token',
          scope: 'openid profile phone email',
          redirect_uri: redirectUrl,
          nonce: nonce,
          state: state,
        }),
    })
      .then(response => {
        if (response.type === 'success') {
          if (response.params && response.params.error) {
            dispatch({
              type: LOGIN_ERROR,
              error: response.params.error_description,
            });
          } else {
            dispatch({
              type: PROFILE.LOGIN_SUCCESS,
              response: response.params,
            });
            onLoginSuccess();
          }
        }
      })
      .catch(error => {
        console.log(error);
        dispatch({ type: PROFILE.LOGIN_ERROR, error: error });
      });
  };
}

export function doLogout(onLogoutSuccess) {
  return async dispatch => {
    dispatch({ type: PROFILE.LOGOUT_STARTED });
    await AsyncStorage.removeItem(LOCAL_STORAGE.TOKEN);
    await AsyncStorage.removeItem(LOCAL_STORAGE.REFRESH_TOKEN);
    //AuthSession.dismiss();
    dispatch({ type: PROFILE.LOGOUT_SUCCESS });
    onLogoutSuccess();
  };
}
