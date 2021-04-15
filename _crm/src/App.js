import './App.scss';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/Home';
import MastersPage from './pages/Masters';
import OrdersPage from './pages/Orders';
import NotFoundPage from './pages/NotFound';
import LoginPage from './pages/Login';
import { AuthProvider } from './contexts/authContext';
import PrivateRoute, { LoginRoute } from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
          <div className="container">
            <header>
              <h2>Beauty Saloon</h2>
              <NavBar />
            </header>

            <main>
              <Switch>
                <PrivateRoute exact path="/">
                  <HomePage />
                </PrivateRoute>

                <PrivateRoute path="/masters">
                  <MastersPage />
                </PrivateRoute>

                <PrivateRoute path="/orders">
                  <OrdersPage />
                </PrivateRoute>

                <LoginRoute path="/login">
                  <LoginPage />
                </LoginRoute>

                <Route path="*">
                  <NotFoundPage />
                </Route>
              </Switch>
            </main>
          </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
