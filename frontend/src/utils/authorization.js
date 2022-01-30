import { AUTHTOKEN } from './constant';

function getAuthorizationHeader() {
  const token = localStorage.getItem(AUTHTOKEN);
  return {
    authorization: `Bearer ${token}`,
  };
}

export default getAuthorizationHeader;
