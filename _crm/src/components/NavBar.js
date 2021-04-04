import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';

export default function NavBar() {
  const { isAuth, logout } = useAuth();

  return isAuth ? (
    <nav>
      <ul>
        <li>
          <Link to="/">Главная</Link>
        </li>
        <li>
          <Link to="/masters">Мастера</Link>
        </li>
        <li>
          <button onClick={logout}>Logout</button>
        </li>
      </ul>
    </nav>
  ) : null;
}
