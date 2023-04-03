import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBook } from 'src/app/interfaces/bookInterface';

@Injectable({
  providedIn: 'root'
})
export class AdminBooksService {

  constructor(private _HttpClient:HttpClient) { }

  // get all books
  getAdminBooks():Observable<any>{
    return this._HttpClient.get("http://localhost:5000/admin/book");
  }

  // post books
  postAdminBooks(postBookDate:any):Observable<any>{
    console.log(postBookDate);
    return this._HttpClient.post('http://localhost:5000/admin/book',postBookDate);
  }

  // delete book
  deleteAdminBook(id:number):Observable<any>{
    return this._HttpClient.delete(`http://localhost:5000/admin/book/${id}`);
  }
    // update books
    updateAdminBooks(id:any,editBookData:any):Observable<any>{
      console.log(id);
      console.log(editBookData);
      return this._HttpClient.put(`http://localhost:5000/admin/book/${id}`,editBookData)
    }
}
