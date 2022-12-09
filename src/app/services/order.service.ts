import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/Order';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private httpClient: HttpClient,
    private authentication: AuthenticationService){}

  getAllOrders(): Observable<Order[]>{
    return this.httpClient.get<Order[]>(`http://localhost:9003/orders`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authentication.getToken()}`)
    });
  }

  getOrderByID(id: number): Observable<Order>{
    return this.httpClient.get<Order>(`http://localhost:9003/orders/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authentication.getToken()}`)
    });
  }

  editOrder(order: Order): Observable<Order>{
    return this.httpClient.put<Order>(`http://localhost:9003/orders/${order.orderNo}`, order, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authentication.getToken()}`)
    });
  }

  deleteOrder(id: number){
    return this.httpClient.delete(`http://localhost:9003/orders/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authentication.getToken()}`)
    });
  }

  getOrdersByUserId(id: number): Observable<Order[]>{
    return this.httpClient.get<Order[]>(`http://localhost:9003/orders/user?userId=${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authentication.getToken()}`)
    });
  }

  placeOrder(newOrder: Order): Observable<Order>{
    return this.httpClient.post<Order>(`http://localhost:9003/orders`, newOrder, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authentication.getToken()}`)
    });
  }

}
