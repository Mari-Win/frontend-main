import useInput from '../hooks/useInput';
import { Button, InputGroup, FormControl } from 'react-bootstrap';

export default function AuthForm({ onLogin }) {
  const loginInput = useInput();
  const passwordInput = useInput();

  function reset() {
    loginInput.setValue('');
    passwordInput.setValue('');
  }

  function handleSubmit(e) {
    e.preventDefault();

    const data = {
      userName: loginInput.value,
      password: passwordInput.value
    };

    onLogin(data);
    reset();
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text>Логин</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl  {...loginInput} placeholder="Введите логин" />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text>Пароль</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl {...passwordInput} type="password" placeholder="Введите пароль" />
      </InputGroup>
      <Button type="submit" variant="outline-primary">Войти</Button>
    </form>
  );
}