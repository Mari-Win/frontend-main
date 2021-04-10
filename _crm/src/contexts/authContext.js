import { createContext, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ApiService from '../api/api-service';
import PubSub from '../services/pubSub';
import TokenService from '../services/token-service';

// Context
const AuthContext = createContext();

// HOC
function AuthProvider(props) {
  const [isAuth, setIsAuth] = useState(TokenService.isTokenValid());
  const history = useHistory();

  async function login(authData) {
    try {
      const { access_token } = await ApiService.login(authData);
      TokenService.setToken(access_token);
      setIsAuth(true);
      history.push('/');
    } catch (error) {
      setIsAuth(false);

      if (error.message) {
        alert(error.message);
      }
    }
  }

  function logout() {
    setIsAuth(false);
    TokenService.removeToken();
    history.push('/login');
  }

  PubSub.on('logout', () => {
    console.log('logout');
    logout();
  });

  return <AuthContext.Provider value={{ login, logout, isAuth }} {...props} />;
}

// Hook
const useAuth = () => useContext(AuthContext);

export { AuthContext, AuthProvider, useAuth };
