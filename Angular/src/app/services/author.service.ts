import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private _HttpClient:HttpClient) { }
  getAllauthor():Observable<any>{
    return this._HttpClient.get("http://localhost:5000/authors");
  }
  getAuthorDetails(id:string):Observable<any>{
    return this._HttpClient.get(`http://localhost:5000/authors/${id}`);
  }

}
