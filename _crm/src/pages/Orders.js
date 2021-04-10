import { useEffect, useState } from 'react';
import Orders from '../components/Orders/Orders';
import OrdersForm from '../components/OrdersForm';
import OrdersContext from '../contexts/ordersContext';
import ApiService from '../api/api-service';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const orders = await ApiService.getOrders();
      setOrders(orders);
    }

    fetchData();
  }, []);

  function createOrder(order) {       
    ApiService.createOrder(order)
                    .then((resp)=>{
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
                    });
  }

  function removeOrder(id) {
    setOrders(orders.filter(o => o.id !== id));
  }

  return (
    <>
      <OrdersForm onCreate={createOrder} />
      <br />

      <OrdersContext.Provider value={{ removeOrder }}>
        {orders.length === 0 ? <p>Нет данных</p> : <Orders orders={orders} />}          
      </OrdersContext.Provider>
    </>
  );
}