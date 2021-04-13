import TokenService from './token-service';
import PubSub from './pubSub';

export class HttpService {

  constructor(baseApiPath) {
    this.baseApi = baseApiPath;
  }

  get baseHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${TokenService.getToken()}`
    };
  }

  async get(path) {
    const response = await fetch(`${this.baseApi}/${path}`, { headers: this.baseHeaders });
    return this._handleResponse(response);
  }

  async getFiltered(path, dateFrom, dateTo, orderStatus, customerSearchString) {
    const response = await fetch(`${this.baseApi}/${path}?from=${dateFrom??''}&to=${dateTo??''}&status=${orderStatus??''}&search=${customerSearchString??''}`, { headers: this.baseHeaders });
    return this._handleResponse(response);
  }

  async post(path, body) {
    const stringifiedData = JSON.stringify(body);

    const response = await fetch(`${this.baseApi}/${path}`, {
      method: 'POST',
      body: stringifiedData,
      headers: this.baseHeaders
    });

    return this._handleResponse(response);
  }

  async patch(path, id, body) {
    const stringifiedData = JSON.stringify(body);

    const response = await fetch(`${this.baseApi}/${path}/${id}`, {
      method: 'PATCH',
      body: stringifiedData,
      headers: this.baseHeaders
    });

    return this._handleResponse(response);
  }

  async delete(path, id) {
    const response = await fetch(`${this.baseApi}/${path}/${id}`, {
      method: 'DELETE',
      headers: this.baseHeaders
    });    
    return this._handleDeleteResponse(response);
  }

  async _handleResponse(response) {
    const parsedData = await response.json();

    if (response.ok) {
      return parsedData;
    }

    if (response.status === 401) {
      PubSub.emit('logout');
    }

    throw parsedData;
  }

  async _handleDeleteResponse(response) {
    let parsedData = {statusCode: '200', message: "Заявка успешно удалена"};

    if (response.status === 200) {     
      return parsedData;
    }

    if (response.status === 404) {      
      parsedData = await response.json();
      return parsedData;
    }

    throw parsedData;
  }
}
