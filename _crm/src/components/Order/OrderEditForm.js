import {useState, useEffect, useContext} from 'react';
import {InputGroup, Form, Row, Col, Button} from 'react-bootstrap';
import ApiService from '../../api/api-service';

export default function OrderEditForm({onEdit, order, closeModal}) {
    const [id, setId] = useState();
    const [visitDate, setVisitDate] = useState();
    const [orderStatus, setOrderStatus] = useState();
    const [finishStatus, setFinishStatus] = useState();
    const [customerId, setCustomerId] = useState();
    const [serviceId, setServiceId] = useState();
    const [masterId, setMasterId] = useState();
    const [mastersOrder, setMastersOrder] = useState([]);
    const [servicesOrder, setSaloonServices] = useState([]);
    const [customersOrder, setCustomers] = useState([]);

    useEffect(() => {
        console.log(order);

        async function fetchData() {
            const mastersOrder = await ApiService.getMasters();
            const servicesOrder = await ApiService.getSaloonServices();
            const customersOrder = await ApiService.getCustomers();
            setMastersOrder(mastersOrder);
            setSaloonServices(servicesOrder);
            setCustomers(customersOrder);
        }

        fetchData().then(() => {
            reset();
        });
    }, []);

    function reset() {
        setId(order.id);
        setVisitDate(order.visitDate);
        setServiceId(order.service.id);
        setMasterId(order.master.id);
        setCustomerId(order.customer.id);
        setOrderStatus(order.status);
        setFinishStatus((order.finishStatus === 'Success') ? 'Success' : 'Failed');
    }

    function handleForm(event) {
        event.preventDefault();

        const data = {
            id,
            visitDate,
            serviceId,
            masterId,
            customerId,
            orderStatus,
            finishStatus
        };

        reset();
        onEdit(data);
        closeModal();
    }

    return (
        <form onSubmit={handleForm}>
            <Row>
                <Col>
                    <InputGroup className="mb-3" hasValidation>
                        <InputGroup.Prepend>
                            <InputGroup.Text>ФИО клиента</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control as="select" name="customerId" value={customerId} onChange={event => {
                            setCustomerId(event.target.value);
                        }}>
                            <option value="">--</option>
                            {customersOrder.map(item => <option value={item.id}>{item.fullName}</option>
                            )}
                        </Form.Control>
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
                            max="2030-04-20"/>
                    </InputGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text>Услуга</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control as="select" name="serviceId" value={serviceId}
                                      onChange={event => setServiceId(event.target.value)}>
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
                        <Form.Control as="select" name="masterId" value={masterId}
                                      onChange={event => setMasterId(event.target.value)}>
                            <option value="">--</option>
                            {mastersOrder.map(item => <option value={item.id}>{item.fullName}</option>
                            )}
                        </Form.Control>
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
                                      onChange={event => setOrderStatus(event.target.value)}>
                            <option value="Opened">Opened</option>
                            <option value="Closed">Closed</option>
                        </Form.Control>
                    </InputGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text>Услуга оказана</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control as="select" name="finishStatus" value={finishStatus}
                                      onChange={event => setFinishStatus(event.target.value)}>
                            <option value="Failed">Нет</option>
                            <option value="Success">Да</option>
                        </Form.Control>
                    </InputGroup>
                </Col>
            </Row>
            <Button variant="primary" onClick={handleForm}>
                Сохранить
            </Button>
        </form>
    )
}