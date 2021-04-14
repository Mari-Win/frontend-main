import {useContext, useState} from 'react';
import bem from 'easy-bem';
import cn from 'classnames';
import {Button, Modal} from 'react-bootstrap';
import './Order.scss';

import ordersContext from '../../contexts/ordersContext';

const b = bem('Order');

export default function Order({order, className, setOrderForEdit}) {
    const {id, createdDate, visitDate, status, finishStatus, master, customer, service} = order;
    const _className = cn(b({status: status}), className);
    let _createdDate = new Date(createdDate);
    let _visitDate = (typeof (visitDate) !== 'undefined') ? new Date(visitDate).toDateString()  : '';
    _createdDate = _createdDate.toDateString() + ' ' + _createdDate.toLocaleTimeString();
    const _serviceName = (service) ? service.name : '';
    const _masterName = (master) ? master.fullName : '';

    const [showDelete, setShowDeleteWindow] = useState(false);
    const handleCloseDeleteWindow = () => setShowDeleteWindow(false);
    const handleShowDeleteWindow = () => setShowDeleteWindow(true);

    const {removeOrder} = useContext(ordersContext);
    const handleRemoveOrder = () => removeOrder(id);

    const handleEditForm = () => setOrderForEdit(order);


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
                <td className={b('button')}><Button onClick={handleEditForm} variant="outline-dark" size="sm"
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
                    <Button variant="primary" onClick={handleRemoveOrder}>
                        Удалить
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
