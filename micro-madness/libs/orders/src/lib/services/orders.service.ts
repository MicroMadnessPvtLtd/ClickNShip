import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';
import { Product } from '../models/product';

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

  createOrder(order: Order) : Observable<Order> {
    return this.http.post<Order>(`${this.apiUrlPrefix}orders`, order);
  }

  updateOrder(orderStatus: {status: string}, orderId: string) : Observable<Order> {
    return this.http.put<Order>(`${this.apiUrlPrefix}orders/${orderId}`, orderStatus);
  }

  deleteOrder(orderId: string) : Observable<unknown> {
    return this.http.delete<unknown>(`${this.apiUrlPrefix}orders/${orderId}`);
  }

  getOrdersCount(): Observable<number> {
    return this.http
      .get<number>(`${this.apiUrlPrefix}orders/get/count`)
      .pipe(map((objectValue: any) => objectValue.orderCount));
  }

  getTotalSales(): Observable<number> {
    return this.http
      .get<number>(`${this.apiUrlPrefix}orders/get/totalsales`)
      .pipe(map((objectValue: any) => objectValue.totalsales));
  }

  getProduct(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrlPrefix}products/${productId}`);
  }
}
