import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';

export default function PrivateRoute({ children, ...rest }) {
  const { isAuth } = useAuth();
  const render = isAuth ? children : <Redirect to="/login" />;
  return <Route {...rest} render={() => render} />;
}

export function LoginRoute({ children, ...rest }) {
  const { isAuth } = useAuth();
  const render = isAuth ? <Redirect to="/" /> : children ;
  return <Route {...rest} render={() => render} />;
}
