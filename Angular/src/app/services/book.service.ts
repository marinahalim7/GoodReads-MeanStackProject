
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private _HttpClient: HttpClient) { }
  getAllBooks(): Observable<any> {
    return this._HttpClient.get("http://localhost:5000/books");
  }
  getDetailsBook(id: String): Observable<any> {
    return this._HttpClient.get(`http://localhost:5000/books/${id}`);
  }
  getAllUserBooks(id:string): Observable<any> {
    return this._HttpClient.get(`http://localhost:5000/users/userbook/${id}`);
  }

  getReadBook(id:string): Observable<any> {
    return this._HttpClient.get(`http://localhost:5000/users/readBook/${id}`);
  }
  getCurrentReadBook(id:string): Observable<any> {
    return this._HttpClient.get(`http://localhost:5000/users/currentReadBook/${id}`);
  }
  getWantReadBook(id:string): Observable<any> {
    return this._HttpClient.get(`http://localhost:5000/users/wantedReadBook/${id}`);
  }
}

