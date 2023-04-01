import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CateogriesService {
  constructor(private _HttpClient:HttpClient) { }
  getAllCateogries():Observable<any>{
    return this._HttpClient.get("http://localhost:5000/categories");
  }
  getCateogryDetails(id:String):Observable<any>{
    return this._HttpClient.get(`http://localhost:5000/categories/${id}`);
  }
}