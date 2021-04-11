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

  createOrder(order) {
    return this.post('orders', order);
  }

  deleteOrder(orderId) {
    return this.delete('orders', orderId);
  }

  getSaloonServices() {
    return this.get('services');
  }  

  login(authData) {
    return this.post('login', authData);
  }

}

export default new ApiService();