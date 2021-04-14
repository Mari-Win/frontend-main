import {useState, useEffect} from 'react';
import {Button, InputGroup, Form, Row, Col, Modal} from 'react-bootstrap';
import ApiService from '../../api/api-service';

export default function OrderFormCreate({onCreate, showCreate, closeCreate}) {
    const [name, setName] = useState();
    const [phone, setPhone] = useState();
    const [visitDate, setVisitDate] = useState();
    const [serviceId, setServiceId] = useState();
    const [masterId, setMasterId] = useState();
    const [mastersOrder, setMastersOrder] = useState([]);
    const [servicesOrder, setSaloonServices] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const mastersOrder = await ApiService.getMasters();
            const servicesOrder = await ApiService.getSaloonServices();
            setMastersOrder(mastersOrder);
            setSaloonServices(servicesOrder);
        }

        fetchData();
    }, []);

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
        closeCreate();
    }

    return (
        <Modal show={showCreate} onHide={closeCreate}>
            <Modal.Header closeButton>
                <Modal.Title>Создать новую заявку</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleForm}>
                    <InputGroup className="mb-3" hasValidation>
                        <InputGroup.Prepend>
                            <InputGroup.Text>ФИО клиента</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control value={name} onChange={event => setName(event.target.value)}  placeholder="ФИО клиента" type="text" required />
                    </InputGroup>
                    <Row>
                        <Col>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Телефон</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control value={phone} onChange={event => setPhone(event.target.value)} placeholder="Телефон" required  />
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Дата посещения</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                    name="visitDate"
                                    value={visitDate}
                                    onChange={event => setVisitDate(event.target.value)}
                                    type="date"
                                    required
                                    pattern="\d{4}-\d{2}-\d{2}"
                                    max="2030-04-20" />
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Услуга</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control as="select" value={serviceId} onChange={event => setServiceId(event.target.value)}>
                                    <option value="">--</option>
                                    {servicesOrder.map(item => <option value={item.id}>{item.name}</option>
                                    )}
                                </Form.Control>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Мастер</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control as="select" value={masterId} onChange={event => setMasterId(event.target.value)}>
                                    <option value="">--</option>
                                    {mastersOrder.map(item => <option value={item.id}>{item.fullName}</option>
                                    )}
                                </Form.Control>
                            </InputGroup>
                        </Col>
                    </Row>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button type="submit" variant="primary" onClick={handleForm}>Добавить</Button>
                <Button variant="secondary" onClick={closeCreate}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    )
}
