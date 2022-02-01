import axios from 'axios';
import * as APIPaths from '../utils/apiPaths';
import getAuthorizationHeader from '../utils/authorization';

const {baseUrl} = APIPaths;

export const getAllReserves = async (page, user, bike) => {
  const headers = getAuthorizationHeader();
  const queryString = `?page=${page}`
    .concat(user ? `&user=${user}` : '')
    .concat(bike ? `&bike=${bike}` : '');
  return axios
    .get(baseUrl + APIPaths.getAllReserves + queryString, {headers})
    .then(response => response.data)
    .catch(
      err =>
        (err && err.response && err.response.data) || {
          success: false,
          error: 'Something went wrong',
        }
    );
};

export const createReserve = async reserveInput => {
  const headers = getAuthorizationHeader();
  return axios
    .post(baseUrl + APIPaths.createReserve, reserveInput, {
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

export const getReserve = async reserveId => {
  const headers = getAuthorizationHeader();

  return axios
    .get(`${baseUrl}${APIPaths.getReserve}/${reserveId}`, {
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

export const updateReserve = async (reserveId, reserveInput) => {
  const headers = getAuthorizationHeader();

  return axios
    .put(`${baseUrl}${APIPaths.updateReserve}/${reserveId}`, reserveInput, {
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

export const deleteReserve = async reserveId => {
  const headers = getAuthorizationHeader();

  return axios
    .delete(`${baseUrl}${APIPaths.deleteReserve}/${reserveId}`, {
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
