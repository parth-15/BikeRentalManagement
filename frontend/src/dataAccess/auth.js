import axios from 'axios';
import * as APIPaths from '../utils/apiPaths';
import getAuthorizationHeader from '../utils/authorization';

const {baseUrl} = APIPaths;

export const login = async payload =>
  axios
    .post(baseUrl + APIPaths.login, payload)
    .then(response => response.data)
    .catch(
      err =>
        (err && err.response && err.response.data) || {
          success: false,
          error: 'Something went wrong',
        }
    );

export const signup = async payload =>
  axios
    .post(baseUrl + APIPaths.signup, payload)
    .then(response => response.data)
    .catch(
      err =>
        (err && err.response && err.response.data) || {
          success: false,
          error: 'Something went wrong',
        }
    );

export const me = async () => {
  const headers = getAuthorizationHeader();

  return axios(baseUrl + APIPaths.me, {headers})
    .then(response => response.data)
    .catch(
      err =>
        (err && err.response && err.response.data) || {
          success: false,
          error: 'Something went wrong',
        }
    );
};
