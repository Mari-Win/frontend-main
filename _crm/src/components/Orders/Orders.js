import bem from 'easy-bem';
import Order from '../Order/Order';
import './Orders.scss';
import Table from 'react-bootstrap/Table';

const b = bem('Orders');

export default function Orders({ orders }) {
    return (
        <div className={b()}>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Дата создания заявки</th>
                        <th>Дата посещения</th>
                        <th>Услуга</th>
                        <th>Мастер</th>
                        <th>Клиент</th>
                        <th>Статус</th>
                        <th>Финальный статус</th>
                        <th></th>                        
                    </tr>
                </thead>
                <tbody>
                    {orders.map(item => <Order className={b('item')} key={item.id} order={item} />                        
                    )}</tbody>
            </Table>
        </div>
    );
}
