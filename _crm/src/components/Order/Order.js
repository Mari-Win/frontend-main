import { useContext } from 'react';
import bem from 'easy-bem';
import cn from 'classnames';
import { Button } from 'react-bootstrap';
import './Order.scss';

import ordersContext from '../../contexts/ordersContext';

const b = bem('Order');

export default function Order({ order, className }) {
  const { id, createdDate, visitDate, status, finishStatus, master, customer, service } = order;  
  const _className = cn(b({status: status}), className);
  let _createdDate = new Date(createdDate).toDateString();
  let _visitDate = new Date(visitDate);  
  _visitDate = _visitDate.toDateString() + ' ' + _visitDate.toLocaleTimeString();
 
  const { removeOrder } = useContext(ordersContext);

  return (
    <>
     <tr className = {_className}>
      <td className={b('id')}>{id}</td>
      <td className={b('createdDate')}>{_createdDate} </td>
      <td className={b('visitDate')}>{_visitDate}</td>
      <td className={b('service')}>{service.name}</td>
      <td className={b('master')}>{master.fullName}</td>
      <td className={b('customer')}>{customer.fullName}</td>
      <td className={b('status')}>{status}</td>
      <td className={b('finishStatus')}>{finishStatus}</td>
      <td className={b('button')}><Button onClick={() => removeOrder(id)}  variant="outline-dark"  size="sm" title="Удалить запись">X</Button></td>
    </tr>
    </>
  );
}