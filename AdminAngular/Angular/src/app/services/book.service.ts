import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private _HttpClient:HttpClient) { }
  getAllBooks():Observable<any>{
  return this._HttpClient.get("http://localhost:5000/books");
  }
getDetailsBook(id:String):Observable<any>{
  return this._HttpClient.get(`http://localhost:5000/books/${id}`);
}
/*
addBook_to_User(state:String,id:String):Observable<any>{
  return this._HttpClient.get(`http://localhost:5000/books/${id}`);
}*/
}