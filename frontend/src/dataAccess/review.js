import axios from 'axios';
import * as APIPaths from '../utils/apiPaths';
import getAuthorizationHeader from '../utils/authorization';

const {baseUrl} = APIPaths;

export const getAllReviews = async page => {
  const headers = getAuthorizationHeader();
  const queryString = `?page=${page}`;
  return axios
    .get(baseUrl + APIPaths.getAllReviews + queryString, {headers})
    .then(response => response.data)
    .catch(
      err =>
        (err && err.response && err.response.data) || {
          success: false,
          error: 'Something went wrong',
        }
    );
};

export const createReview = async reviewInput => {
  const headers = getAuthorizationHeader();
  console.log(reviewInput, '----------------------');
  return axios
    .post(baseUrl + APIPaths.createReview, reviewInput, {
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

export const getReview = async reviewId => {
  const headers = getAuthorizationHeader();

  return axios
    .get(`${baseUrl}${APIPaths.getReview}/${reviewId}`, {
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

export const updateReview = async (reviewId, reviewInput) => {
  const headers = getAuthorizationHeader();

  return axios
    .put(`${baseUrl}${APIPaths.updateReview}/${reviewId}`, reviewInput, {
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

export const deleteReview = async reviewId => {
  const headers = getAuthorizationHeader();

  return axios
    .delete(`${baseUrl}${APIPaths.deleteReview}/${reviewId}`, {
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
