import {useEffect, useState} from 'react';
import Orders from '../components/Orders/Orders';
import OrdersForm from '../components/OrdersForm';
import OrdersContext from '../contexts/ordersContext';
import ApiService from '../api/api-service';
import {Alert} from 'react-bootstrap';

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [showA, setShowA] = useState(false);
    const [message, setMessage] = useState('');

    const handleCloseA = () => setShowA(false);
    const handleShowA = () => setShowA(true);

    useEffect(() => {
        async function fetchData() {
            const orders = await ApiService.getOrders();
            setOrders(orders);
        }

        fetchData();
    }, []);

    function createOrder(order) {
        ApiService.createOrder(order)
            .then((resp) => {
                setOrders(orders.concat([{
                    ...order,
                    id: resp.id,
                    createdDate: resp.createdDate,
                    visitDate: resp.visitDate,
                    service: resp.service,
                    master: resp.master,
                    customer: resp.customer,
                    status: resp.status,
                    finishStatus: resp.finishStatus
                }]));
                setMessage('Заявка успешно создана');
                handleShowA();
                setTimeout(() => {
                    handleCloseA();
                }, 3000);
            });
    }

    function editOrder(order) {
        order.status = order.orderStatus;
        console.log('Editing order');
        console.log(order);
/*       ApiService.editOrder(id, order)
            .then((resp) => {
               // setOrders(orders.filter(o => o.id !== id)); отредактировать строку в таблице
               // преобразовать в запросе поле orderStatus в status
                setMessage('Заявка номер ' + order.id + ' обновлена');
                handleShowA();
                setTimeout(() => {
                    handleCloseA();
                }, 3000);
            });
*/
        setMessage('Заявка номер ' + order.id + ' обновлена');
        handleShowA();
        setTimeout(() => {
            handleCloseA();
        }, 3000);
    }

    function removeOrder(id) {
        ApiService.deleteOrder(id)
            .then((resp) => {
                setOrders(orders.filter(o => o.id !== id));
                setMessage(resp.message);
                handleShowA();
                setTimeout(() => {
                    handleCloseA();
                }, 3000);
            });
    }

    return (
        <>
            <OrdersForm onCreate={createOrder}/>
            <br/>
            <Alert key="1" variant="success" show={showA}>
                {message}
            </Alert>
            <OrdersContext.Provider value={{removeOrder, editOrder}}>
                {orders.length === 0 ? <p>Нет данных</p> : <Orders orders={orders}/>}
            </OrdersContext.Provider>
        </>
    );
}
