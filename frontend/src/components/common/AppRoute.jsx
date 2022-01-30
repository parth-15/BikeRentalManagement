/* eslint-disable no-confusing-arrow */
import { Redirect, Route } from 'react-router-dom';

import { useAuthenticatedUser } from '../../providers/AuthProvider';
import { AUTHENTICATED, GUEST, MANAGER, USER } from '../../utils/constant';

export default function AppRoute({
  component: Component,
  restrictedTo,
  ...otherProps
}) {
  const authenticatedUser = useAuthenticatedUser();

  if (!restrictedTo) {
    return (
      <Route {...otherProps} render={(props) => <Component {...props} />} />
    );
  }

  if (restrictedTo === GUEST) {
    return (
      <Route
        {...otherProps}
        render={(props) =>
          !authenticatedUser.role ? (
            <Component {...props} />
          ) : (
            <Redirect to="/" />
          )
        }
      />
    );
  }

  if (restrictedTo === AUTHENTICATED) {
    return (
      <Route
        {...otherProps}
        render={(props) =>
          [USER, MANAGER].includes(authenticatedUser.role) ? (
            <Component {...props} />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    );
  }

  if (restrictedTo === MANAGER) {
    return (
      <Route
        {...otherProps}
        render={(props) =>
          authenticatedUser.role === MANAGER ? (
            <Component {...props} />
          ) : (
            <Redirect to="/" />
          )
        }
      />
    );
  }
}
