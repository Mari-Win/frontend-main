import bem from 'easy-bem';
import cn from 'classnames';
import {Button} from 'react-bootstrap';
import './Order.scss';

const b = bem('Order');

export default function Order({order, className, setOrderForEdit, setOrderForRemove}) {
    const {id, createdDate, visitDate, status, finishStatus, master, customer, service} = order;
    const _className = cn(b({status: status}), className);
    let _createdDate = new Date(createdDate);
    let _visitDate = (typeof (visitDate) !== 'undefined') ? new Date(visitDate).toDateString()  : '';
    _createdDate = _createdDate.toDateString() + ' ' + _createdDate.toLocaleTimeString();
    const _serviceName = (service) ? service.name : '';
    const _masterName = (master) ? master.fullName : '';

    const handleEditForm = () => setOrderForEdit(order);
    const handleRemoveForm = () => setOrderForRemove(order);

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
                <td className={b('button')}><Button onClick={handleRemoveForm} variant="outline-dark" size="sm"
                                                    title="Удалить запись">X</Button></td>
            </tr>
        </>
    );
}
