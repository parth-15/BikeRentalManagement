import { useContext, createContext, useState, useEffect } from 'react';

import { me } from '../dataAccess/auth';
import { AUTHTOKEN, USER } from '../utils/constant';

const UserContext = createContext();
const UserUpdateContext = createContext();

export function useAuthenticatedUser() {
  return useContext(UserContext);
}

export function useUpdateAuthenticatedUser() {
  return useContext(UserUpdateContext);
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(
    localStorage.getItem('user') ? JSON.parse(localStorage.getItem(USER)) : {},
  );

  useEffect(() => {
    const token = localStorage.getItem(AUTHTOKEN);
    if (token) {
      // eslint-disable-next-line no-shadow
      me().then(({ success, user }) => {
        if (success) {
          localStorage.setItem(USER, JSON.stringify(user));
          setUser(user);
        } else {
          localStorage.removeItem(USER);
          localStorage.removeItem(AUTHTOKEN);
          setUser({});
        }
      });
    }
  }, []);

  return (
    <UserContext.Provider value={user}>
      <UserUpdateContext.Provider value={setUser}>
        {children}
      </UserUpdateContext.Provider>
    </UserContext.Provider>
  );
}
