import { API_PATH } from '../constants';
import { HttpService } from '../services/http-service';

export class ApiService extends HttpService {

  constructor() {
    super(API_PATH);
  }

  getMasters() {
    return this.get('staff');
  }

  getOrders() {
    return this.get('orders');
  }

  getFilteredOrders(dateFrom, dateTo, orderStatus, customerSearchString) {
    return this.getFiltered('orders', dateFrom, dateTo, orderStatus, customerSearchString);
  }

  createOrder(order) {
    return this.post('orders', order);
  }

  editOrder(orderId, order) {
    return this.patch('orders', orderId, order);
  }

  deleteOrder(orderId) {
    return this.delete('orders', orderId);
  }

  getSaloonServices() {
    return this.get('services');
  }

  getCustomers() {
    return this.get('customers');
  }

  login(authData) {
    return this.post('login', authData);
  }

}

export default new ApiService();
