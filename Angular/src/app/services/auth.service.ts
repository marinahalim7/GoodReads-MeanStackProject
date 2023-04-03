import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';
import { __values } from 'tslib';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser = new BehaviorSubject(null);
  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    if (localStorage.getItem('userToken') != null){
      this.saveCurrentUser();
    }
  }
  saveCurrentUser() {
    let token: any = localStorage.getItem("userToken");
    this.currentUser.next(jwtDecode(token));
    const userId:any=this.currentUser.getValue();
    const userIdOfCurrentUser=userId.user_id;
    return userIdOfCurrentUser
  }
  register(formData: any): Observable<any> {
    return this._HttpClient.post('http://localhost:5000/usersAuth/register', formData)
  }
  login(formData: any): Observable<any> {
    return this._HttpClient.post('http://localhost:5000/usersAuth/login', formData)
  }
  logout() {
    this.currentUser.next(null);
    localStorage.removeItem("userToken");
    this._Router.navigate(['/login']);
  }
}
