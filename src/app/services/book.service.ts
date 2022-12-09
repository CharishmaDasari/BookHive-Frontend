import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthenticationService } from './authentication.service';
import { Book } from '../models/Book';



@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(
    private httpClient: HttpClient,
    private authentication: AuthenticationService){}

    getAllBooks(): Observable<Book[]> {
      return this.httpClient.get<Book[]>(`http://localhost:7777/api/v1/book`, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.authentication.getToken()}`)
      });
    }

    addNewBook(book: Book ): Observable<Book>{
      return this.httpClient.post<Book>(`http://localhost:7777/api/v1/book`, book, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.authentication.getToken()}`)
      })
    }

    updateBook(book: Book){
      return this.httpClient.put<Book>(`http://localhost:7777/api/v1/book/${book.id}`, book, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.authentication.getToken()}`)
      })
    }

    getBookById(id:number):Observable<Book> {
      return this.httpClient.get<Book>(`http://localhost:7777/api/v1/book/${id}`, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.authentication.getToken()}`)
      });
    }

    deleteBook(id: number){
      return this.httpClient.delete<Book>(`http://localhost:7777/api/v1/book/${id}`, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.authentication.getToken()}`)
      });
    }

}



