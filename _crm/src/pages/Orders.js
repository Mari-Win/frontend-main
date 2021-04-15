import {useEffect, useState} from 'react';
import Orders from '../components/Orders/Orders';
import OrderFormCreate from '../components/Orders/OrderFormCreate';
import ApiService from '../api/api-service';
import FilterForm from "../components/Orders/FilterForm";
import {Alert, Button} from 'react-bootstrap';
import OrderFormEdit from "../components/Orders/OrderFormEdit";
import OrderFormRemove from "../components/Orders/OrderFormRemove";

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);

    const [showAlert, setShowAlert] = useState(false);
    const handleCloseAlert = () => setShowAlert(false);
    const handleShowAlert = () => setShowAlert(true);

    const [message, setMessage] = useState('');

    const [showCreate, setShowCreateWindow] = useState(false);
    const handleShowCreateWindow = () => setShowCreateWindow(true);
    const handleCloseCreateWindow = () => setShowCreateWindow(false);

    const [selectedOrderForEdit, setSelectedOrderForEdit] = useState('');

    const [showEdit, setShowEditWindow] = useState(false);
    const handleShowEditWindow = () => setShowEditWindow(true);
    const handleCloseEditWindow = () => {
        setShowEditWindow(false);
    };

    function handleEditSelectedOrder(order) {
        setSelectedOrderForEdit(order);
        handleShowEditWindow();
    }

    const [selectedOrderForRemove, setSelectedOrderForRemove] = useState('');

    const [showRemove, setShowRemoveWindow] = useState(false);
    const handleShowRemoveWindow = () => setShowRemoveWindow(true);
    const handleCloseRemoveWindow = () => {
        setShowRemoveWindow(false);
    };

    function handleRemoveSelectedOrder(order) {
        setSelectedOrderForRemove(order);
        handleShowRemoveWindow();
    }

    useEffect(() => {
        async function fetchData() {
            const orders = await ApiService.getOrders();
            setOrders(orders);
        }

        fetchData();
    }, []);

    function filterOrders(filterData) {
        async function fetchData() {
            const orders = await ApiService.getFilteredOrders(filterData.dateFrom, filterData.dateTo, filterData.orderStatus, filterData.search);
            setOrders(orders);
        }

        fetchData();
    }

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
                handleShowAlert();
                setTimeout(() => {
                    handleCloseAlert();
                }, 3000);
            });
    }

    function editOrder(order) {
        order.status = order.orderStatus;
        console.log('Editing order');
        console.log(order);
/*
        ApiService.editOrder(order.id, order)
            .then((resp) => {
                // setOrders(orders.filter(o => o.id !== id)); отредактировать строку в таблице
                // преобразовать в запросе поле orderStatus в status
                showAlertOnEdit(order);
            });
*/
        showAlertOnEdit(order);
    }

    function showAlertOnEdit(order) {
        setMessage('Заявка номер ' + order.id + ' обновлена');
        handleShowAlert();
        setTimeout(() => {
            handleCloseAlert();
        }, 3000);
    }

    function removeOrder(id) {
        ApiService.deleteOrder(id)
            .then((resp) => {
                setOrders(orders.filter(o => o.id !== id));
                setMessage(resp.message);
                handleShowAlert();
                setTimeout(() => {
                    handleCloseAlert();
                }, 3000);
            });
    }

    return (
        <>
            <OrderFormCreate onCreate={createOrder} showCreate={showCreate} closeCreate={handleCloseCreateWindow}/>
            <OrderFormEdit onEdit={editOrder} order={selectedOrderForEdit} showEdit={showEdit} closeEdit={handleCloseEditWindow} />
            <OrderFormRemove onRemove={removeOrder} order={selectedOrderForRemove} showRemove={showRemove} closeRemove={handleCloseRemoveWindow} />
            <h2>Фильтр для заявок</h2>
            <FilterForm onFilter={filterOrders}/>
            <Button variant="outline-primary" onClick={handleShowCreateWindow} className="mb-3">Создать новую заявку</Button>
            <Alert key="1" variant="success" show={showAlert}>
                {message}
            </Alert>
            {orders.length === 0 ? <p>Нет данных</p> : <Orders orders={orders} setOrderForEdit={handleEditSelectedOrder} setOrderForRemove={handleRemoveSelectedOrder}/>}
        </>
    );
}
