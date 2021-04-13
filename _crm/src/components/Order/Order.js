import {useContext, useState} from 'react';
import bem from 'easy-bem';
import cn from 'classnames';
import {Button, Modal} from 'react-bootstrap';
import './Order.scss';

import ordersContext from '../../contexts/ordersContext';
import OrderEditForm from "./OrderEditForm";

const b = bem('Order');

export default function Order({order, className}) {
    const {id, createdDate, visitDate, status, finishStatus, master, customer, service} = order;
    const _className = cn(b({status: status}), className);
    let _createdDate = new Date(createdDate);
    let _visitDate = new Date(visitDate);
    _createdDate = _createdDate.toDateString() + ' ' + _createdDate.toLocaleTimeString();
    _visitDate = _visitDate.toDateString();
    const _serviceName = (service) ? service.name : '';
    const _masterName = (master) ? master.fullName : '';

    const [showDelete, setShowDeleteWindow] = useState(false);
    const handleCloseDeleteWindow = () => setShowDeleteWindow(false);
    const handleShowDeleteWindow = () => setShowDeleteWindow(true);

    const [showEdit, setShowEditWindow] = useState(false);
    const handleCloseEditWindow = () => setShowEditWindow(false);

    const {removeOrder} = useContext(ordersContext);
    const {editOrder} = useContext(ordersContext);

    function _handleEditWindow(order) {
        setShowEditWindow(true);
    }

    return (
        <>
            <tr className={_className}>
                <td className={b('id')}>{id}</td>
                <td className={b('createdDate')}>{_createdDate} </td>
                <td className={b('visitDate')}>{_visitDate}</td>
                <td className={b('service')}>{_serviceName}</td>
                <td className={b('master')}>{_masterName}</td>
                <td className={b('customer')}>{customer.fullName}</td>
                <td className={b('status')}>{status}</td>
                <td className={b('finishStatus')}>{finishStatus}</td>
                <td className={b('button')}><Button onClick={() => _handleEditWindow(id, order)} variant="outline-dark" size="sm"
                                                    title="Редактировать запись">Edit</Button></td>
                <td className={b('button')}><Button onClick={handleShowDeleteWindow} variant="outline-dark" size="sm"
                                                    title="Удалить запись">X</Button></td>
            </tr>

            <Modal show={showDelete} onHide={handleCloseDeleteWindow}>
                <Modal.Header closeButton>
                    <Modal.Title>Вы действительно хотите удалить эту запись?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Дата посещения: {_visitDate} <br/>
                    Услуга: {_serviceName} <br/>
                    Мастер: {_masterName} <br/>
                    Клиент: {customer.fullName}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteWindow}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => removeOrder(id)}>
                        Удалить
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showEdit} onHide={handleCloseEditWindow}>
                <Modal.Header closeButton>
                    <Modal.Title>Редактировать запись</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <OrderEditForm onEdit={editOrder} order={order} closeModal={handleCloseEditWindow}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEditWindow}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
