import { Book } from '../models/Book';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../models/Cart';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart(Cart: any) {
    throw new Error('Method not implemented.');
  }


  constructor(
    private httpClient: HttpClient,
    private authentication: AuthenticationService
  ) { }



    createNewCart(cart: Cart): Observable<Cart>{
      return this.httpClient.post<Cart>(`http://localhost:9006/api/v1/cart`, cart, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.authentication.getToken()}`)
      })
    }

    updateCart(cart: Cart): Observable<Cart>{
      return this.httpClient.put<Cart>(`http://localhost:9006/api/v1/cart/${cart.cartId}`, cart,{
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.authentication.getToken()}`)
      })

    }

    getCartById(id:number): Observable<Cart> {
      return this.httpClient.get<Cart>(`http://localhost:9006/api/v1/cart/${id}`, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.authentication.getToken()}`)
    });

  }

    deleteCart(id: number){
      return this.httpClient.delete(`http://localhost:9006/api/v1/cart/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authentication.getToken()}`)
    });
    }
  }
