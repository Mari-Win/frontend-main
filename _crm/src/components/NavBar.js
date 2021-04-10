import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import { Nav, Button } from 'react-bootstrap';
import { Navbar as Nbar } from 'react-bootstrap';

export default function NavBar() {
  const { isAuth, logout } = useAuth();

  return isAuth ? (
    <Nbar bg="light" variant="light">
      <Nav className="mr-auto">
        <Nav.Link href="/">Главная</Nav.Link>
        <Nav.Link href="/masters">Мастера</Nav.Link>
        <Nav.Link href="/orders">Заказы</Nav.Link>
        <Button onClick={logout} type="submit" variant="outline-primary">Logout</Button>
      </Nav>
    </Nbar>
  ) : null;
}
