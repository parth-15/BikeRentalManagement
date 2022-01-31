import axios from 'axios';
import * as APIPaths from '../utils/apiPaths';
import getAuthorizationHeader from '../utils/authorization';

const {baseUrl} = APIPaths;

export const getFilterData = async () => {
  const headers = getAuthorizationHeader();
  return axios
    .get(baseUrl + APIPaths.getFilterData, {headers})
    .then(response => response.data)
    .catch(
      err =>
        (err && err.response && err.response.data) || {
          success: false,
          error: 'Something went wrong',
        }
    );
};
