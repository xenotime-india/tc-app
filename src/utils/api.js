import axios from 'axios';
import { API_URL, API_REQUEST_TIMEOUT } from 'react-native-dotenv';

let _api_instance = axios.create({
  baseURL: API_URL + '/api',
  //timeout: API_REQUEST_TIMEOUT,
});

const instance = token => {
  if (token) {
    _api_instance = axios.create({
      baseURL: API_URL + '/api',
      //timeout: API_REQUEST_TIMEOUT,
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    });
  }
  return _api_instance;
};

export default instance;
