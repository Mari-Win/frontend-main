import { useRef, useState } from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap';

export default function MastersForm({ onCreate }) {
  const [firstName, setName] = useState();
  const [patronymic, setPatronic] = useState();
  const [surName, setSurName] = useState();
  const [position, setPosition] = useState();
  const [photo, setPhoto] = useState();

  function reset() {
    setName('');
    setSurName('');
    setPatronic('');
    setPosition('');
    setPhoto('');
  }

  function handleForm(event) {
    event.preventDefault();

    const data = {
      firstName,
      patronymic,
      surName,
      position,
      photo
    };

    reset();
    onCreate(data);
  }

  return (
    <form onSubmit={handleForm}>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text>Фамилия / Имя / Отчество </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl value={surName} onChange={event => setSurName(event.target.value)}  placeholder="Фамилия" required />
        <FormControl value={firstName} onChange={event => setName(event.target.value)}  placeholder="Имя" required  />
        <FormControl value={patronymic} onChange={event => setPatronic(event.target.value)}  placeholder="Отчество" required  />        
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text>Позиция</InputGroup.Text>
        </InputGroup.Prepend>        
        <FormControl value={position} onChange={event => setPosition(event.target.value)} placeholder="Позиция" required  />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text>Ссылка на фотографию</InputGroup.Text>
        </InputGroup.Prepend>        
        <FormControl  value={photo} onChange={event => setPhoto(event.target.value)} placeholder="Ссылка на фотографию" />
      </InputGroup>

      <Button type="submit" variant="outline-primary">Добавить нового мастера</Button>
    </form>
  )
}