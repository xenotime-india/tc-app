import {
  AUTH0_DOMAIN,
  AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET,
  AUTH0_APIAUDIENCE,
  AUTH0_SCOPE,
} from 'react-native-dotenv';
import { AsyncStorage } from 'react-native';
import { LOCAL_STORAGE } from '../constants';

export const auth0Login = async ({ username, password }) => {
  const bodyParams = {
    client_id: AUTH0_CLIENT_ID,
    client_secret: AUTH0_CLIENT_SECRET,
    grant_type: 'password',
    username: username,
    password: password,
    audience: AUTH0_APIAUDIENCE,
    scope: AUTH0_SCOPE,
    device: username,
  };
  const response = await fetch(`https://${AUTH0_DOMAIN}/oauth/token`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyParams),
  });
  const responseJson = await response.json();
  console.log('responseJson', responseJson);
  return responseJson;
};

export const auth0Refresh = async ({ refreshToken, device }) => {
  const bodyParams = {
    client_id: AUTH0_CLIENT_ID,
    client_secret: AUTH0_CLIENT_SECRET,
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    scope: AUTH0_SCOPE,
    audience: AUTH0_APIAUDIENCE,
  };
  console.log(bodyParams);
  const response = await fetch(`https://${AUTH0_DOMAIN}/oauth/token`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyParams),
  });
  const responseJson = await response.json();
  console.log('responseJson', responseJson);
  const { access_token, expires_in, id_token } = responseJson;
  const expiresAt = expires_in * 1000 + new Date().getTime();

  // Set the time that the access token will expire at
  await AsyncStorage.setItem(
    LOCAL_STORAGE.TOKEN,
    JSON.stringify({
      access_token,
      id_token,
      expires_in: expiresAt,
    })
  );
  return { ...responseJson, expires_in: expiresAt };
};

export const isAuthenticated = async () => {
  const userTokenJson = await AsyncStorage.getItem(LOCAL_STORAGE.TOKEN);
  const refresh_token = await AsyncStorage.getItem(LOCAL_STORAGE.REFRESH_TOKEN);
  const userToken = JSON.parse(userTokenJson || '{}');

  console.log('userToken', userToken);
  console.log('refresh_token', refresh_token);

  // Check whether the current time is past the
  // access token's expiry time

  let { expires_in } = userToken || {};
  if (expires_in) {
    const dt = new Date();
    dt.setHours(dt.getHours() + 5);
    console.log(dt.getTime(), expires_in);
    console.log(new Date().getTime() < expires_in);
    console.log(new Date().getTime() < expires_in);
    if (new Date().getTime() < expires_in) {
      return userToken;
    } else if (refresh_token) {
      try {
        const newUserToken = await auth0Refresh({
          refreshToken: refresh_token,
        });
        console.log('newUserToken', newUserToken);
        return newUserToken;
      } catch (ex) {
        console.log(ex);
        return null;
      }
    }
  }
  return null;
};
