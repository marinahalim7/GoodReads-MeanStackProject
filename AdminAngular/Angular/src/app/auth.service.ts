import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser = new BehaviorSubject(null);
  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    if (localStorage.getItem('userToken') != null)   /*    if not empty ..get data and call method*/ {
      this.saveCurrentUser();
    }
  }
  saveCurrentUser() {
    let token: any = localStorage.getItem("userToken");
    this.currentUser.next(jwtDecode(token));
    console.log(this.currentUser);
  }
  register(formData: any): Observable<any> {
    console.log(formData);
    return this._HttpClient.post('http://localhost:5000/usersAuth/register', formData)
  }
  login(formData: any): Observable<any> {
    console.log(formData);
    return this._HttpClient.post('http://localhost:5000/usersAuth/login', formData)
  }
  logout() {
    this.currentUser.next(null);
    localStorage.removeItem("userToken");
    (<any>this._Router).navigate(['/login']);
  }
}