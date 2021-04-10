import { useRef, useState } from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap';

export default function OrdersForm({ onCreate }) {
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [visitDate, setVisitDate] = useState();
  const [serviceId, setServiceId] = useState();
  const [masterId, setMasterId] = useState();

  function reset() {
    setName('');
    setPhone('');
    setVisitDate('');
    setServiceId('');
    setMasterId('');    
  }

  function handleForm(event) {
    event.preventDefault();

    const data = {        
        name,
        phone,
        visitDate,
        serviceId,
        masterId      
    };

    reset();
    onCreate(data);
  }

  return (
    <form onSubmit={handleForm}>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text>ФИО клиента</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl value={name} onChange={event => setName(event.target.value)}  placeholder="ФИО клиента" required />        
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text>Телефон</InputGroup.Text>
        </InputGroup.Prepend>        
        <FormControl value={phone} onChange={event => setPhone(event.target.value)} placeholder="Телефон" required  />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text>Услуга</InputGroup.Text>
        </InputGroup.Prepend>        
        <FormControl value={serviceId} onChange={event => setServiceId(event.target.value)} placeholder="Услуга" required  />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text>Мастер</InputGroup.Text>
        </InputGroup.Prepend>        
        <FormControl value={masterId} onChange={event => setMasterId(event.target.value)} placeholder="Мастер" required  />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text>Дата посещения</InputGroup.Text>
        </InputGroup.Prepend>        
        <FormControl  value={visitDate} onChange={event => setVisitDate(event.target.value)} placeholder="Дата посещения" />
      </InputGroup>

      <Button type="submit" variant="outline-primary">Добавить новую запись</Button>
    </form>
  )
}