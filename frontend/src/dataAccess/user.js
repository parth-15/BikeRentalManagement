import axios from 'axios';
import * as APIPaths from '../utils/apiPaths';
import getAuthorizationHeader from '../utils/authorization';

const {baseUrl} = APIPaths;

export const getAllUsers = async page => {
  const headers = getAuthorizationHeader();
  const queryString = `?page=${page}`;
  return axios
    .get(baseUrl + APIPaths.getAllUsers + queryString, {headers})
    .then(response => response.data)
    .catch(
      err =>
        (err && err.response && err.response.data) || {
          success: false,
          error: 'Something went wrong',
        }
    );
};

export const createUser = async userInput => {
  const headers = getAuthorizationHeader();
  return axios
    .post(baseUrl + APIPaths.createUser, userInput, {
      'Content-Type': 'application/json',
      headers,
    })
    .then(response => response.data)
    .catch(
      err =>
        (err && err.response && err.response.data) || {
          success: false,
          error: 'Something went wrong',
        }
    );
};

export const getUser = async userId => {
  const headers = getAuthorizationHeader();

  return axios
    .get(`${baseUrl}${APIPaths.getUser}/${userId}`, {
      headers,
    })
    .then(response => response.data)
    .catch(
      err =>
        (err && err.response && err.response.data) || {
          success: false,
          error: 'Something went wrong',
        }
    );
};

export const updateUser = async (userId, userInput) => {
  const headers = getAuthorizationHeader();

  return axios
    .put(`${baseUrl}${APIPaths.updateUser}/${userId}`, userInput, {
      'Content-type': 'application/json',
      headers,
    })
    .then(response => response.data)
    .catch(
      err =>
        (err && err.response && err.response.data) || {
          success: false,
          error: 'Something went wrong',
        }
    );
};

export const deleteUser = async userId => {
  const headers = getAuthorizationHeader();

  return axios
    .delete(`${baseUrl}${APIPaths.deleteUser}/${userId}`, {
      headers,
    })
    .then(response => response.data)
    .catch(
      err =>
        (err && err.response && err.response.data) || {
          success: false,
          error: 'Something went wrong',
        }
    );
};
