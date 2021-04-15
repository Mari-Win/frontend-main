import {Button, Modal} from 'react-bootstrap';

export default function OrderFormRemove({ onRemove, order, showRemove, closeRemove }) {
    const {id, visitDate, master, customer, service} = order;
    let _visitDate = (typeof (visitDate) !== 'undefined') ? new Date(visitDate).toDateString()  : '';
    const _serviceName = (service) ? service.name : '';
    const _masterName = (master) ? master.fullName : '';
    const _customerName = (customer) ? customer.fullName : '';

    function handleForm(event) {
        event.preventDefault();

        onRemove(id);
        closeRemove();
    }

    return (
        <Modal show={showRemove} onHide={closeRemove}>
            <Modal.Header closeButton>
                <Modal.Title>Вы действительно хотите удалить эту запись?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Дата посещения: {_visitDate} <br/>
                Услуга: {_serviceName} <br/>
                Мастер: {_masterName} <br/>
                Клиент: {_customerName}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleForm}>
                    Удалить
                </Button>
                <Button variant="secondary" onClick={closeRemove}>
                    Закрыть
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
