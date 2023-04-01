import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class RoutingService {
  constructor(private _HttpClient:HttpClient) { }
  getData(data:any){
    return this._HttpClient.get('http://localhost:5000/users/user',data)
  }
}





