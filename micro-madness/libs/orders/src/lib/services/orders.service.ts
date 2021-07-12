import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  apiUrlPrefix = environment.apiURL;

  constructor(private http: HttpClient) { }

  getOrders() : Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrlPrefix}orders/`);
  }

  getOrder(orderId: string) : Observable<Order> {
    return this.http.get<Order>(`${this.apiUrlPrefix}orders/${orderId}`);
  }

  updateOrder(orderStatus: {status: string}, orderId: string) : Observable<Order> {
    return this.http.put<Order>(`${this.apiUrlPrefix}orders/${orderId}`, orderStatus);
  }

  deleteOrder(orderId: string) : Observable<unknown> {
    return this.http.delete<unknown>(`${this.apiUrlPrefix}orders/${orderId}`);
  }
}
