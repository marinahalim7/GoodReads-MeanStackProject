import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class LoginadminAuthService {

  constructor(private _HttpClient:HttpClient) {
    
  }

  currentAdmin = new BehaviorSubject(null);


  saveCurrentAdmin()
  {
    let token:any = localStorage.getItem('adminToken');
    this.currentAdmin.next(jwt_decode(token)); 
    console.log(this.currentAdmin);
  }

   loginAdmin(formData:any):Observable<any>
   {
    return this._HttpClient.post('http://localhost:5000/admin',formData);
   }
}
