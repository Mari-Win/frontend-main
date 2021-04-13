import { useRef, useState, useEffect } from 'react';
import { Button, InputGroup, Form, Row, Col } from 'react-bootstrap';

export default function FilterForm({ onFilter }) {
  const [dateFrom, setDateFrom] = useState();
  const [dateTo, setDateTo] = useState();
  const [orderStatus, setStatus] = useState();
  const [search, setSearch] = useState();

  function reset() {
      setDateFrom('');
      setDateTo('');
      setStatus('');
      setSearch('');
  }

  function handleForm(event) {
    event.preventDefault();

    const data = {        
        dateFrom,
        dateTo,
        orderStatus,
        search
    };

     onFilter(data);
  }

  return (
    <form onSubmit={handleForm}>
      <InputGroup className="mb-3" hasValidation>
        <InputGroup.Prepend>
          <InputGroup.Text>ФИО клиента</InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control value={search} onChange={event => setSearch(event.target.value)}  placeholder="ФИО клиента" type="text"  />
      </InputGroup>
      <Row>
          <Col>
              <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                      <InputGroup.Text>Date from</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                      name="dateFrom"
                      value={dateFrom}
                      onChange={event => setDateFrom(event.target.value)}
                      type="date"
                      pattern="\d{4}-\d{2}-\d{2}"
                      max="2030-04-20" />
              </InputGroup>
          </Col>
          <Col>
           <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text>Date to</InputGroup.Text>
                </InputGroup.Prepend>        
                <Form.Control          
                    name="dateTo"
                    value={dateTo}
                    onChange={event => setDateTo(event.target.value)}
                    type="date" 
                    pattern="\d{4}-\d{2}-\d{2}"
                    max="2030-04-20" />
            </InputGroup>
          </Col>
      </Row>
        <Row>
            <Col>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text>Статус</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control as="select" name="status" value={orderStatus}
                                  onChange={event => setStatus(event.target.value)}>
                        <option value="">--</option>
                        <option value="Opened">Opened</option>
                        <option value="Closed">Closed</option>
                    </Form.Control>
                </InputGroup>
            </Col>
        </Row>
      <Button type="submit" variant="outline-primary">Фильтровать</Button>
      <Button variant="outline-primary" onClick={reset}>Очистить</Button>
    </form>
  )
}
