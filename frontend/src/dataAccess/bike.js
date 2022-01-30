import axios from 'axios';
import * as APIPaths from '../utils/apiPaths';
import getAuthorizationHeader from '../utils/authorization';

const {baseUrl} = APIPaths;

export const getAllBikes = async (page, filterObj) => {
  const headers = getAuthorizationHeader();
  const queryString = `?page=${page}&${new URLSearchParams(filterObj).toString()}`;
  console.log(queryString);
  return axios
    .get(baseUrl + APIPaths.getAllBikes + queryString, {headers})
    .then(response => response.data)
    .catch(
      err =>
        (err && err.response && err.response.data) || {
          success: false,
          error: 'Something went wrong',
        }
    );
};

export const createBike = async bikeInput => {
  const headers = getAuthorizationHeader();

  return axios
    .post(baseUrl + APIPaths.createBike, bikeInput, {
      'Content-Type': 'application/json',
      ...headers,
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

export const getBike = async bikeId => {
  const headers = getAuthorizationHeader();

  return axios
    .get(`${baseUrl}${APIPaths.getBike}/${bikeId}`, {
      ...headers,
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

export const updateBike = async (bikeId, bikeInput) => {
  const headers = getAuthorizationHeader();

  return axios
    .put(`${baseUrl}${APIPaths.updateBike}/${bikeId}`, bikeInput, {
      'Content-type': 'application/json',
      ...headers,
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

export const deleteBike = async bikeId => {
  const headers = getAuthorizationHeader();

  return axios
    .delete(`${baseUrl}${APIPaths.deleteBike}/${bikeId}`, {
      ...headers,
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
