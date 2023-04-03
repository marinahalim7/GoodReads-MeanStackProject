import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserReviewsService {

  constructor(private _HttpClient:HttpClient) {} 
  updateReview(reviewObj:any,bookID:any):Observable<any>{
    return this._HttpClient.put(`http://localhost:5000/users/userbook/${bookID}`,reviewObj);
  }
  getBookOfUSer(slectObj:any):Observable<any>{
    return this._HttpClient.post(`http://localhost:5000/users/userbook`,slectObj); 
}
}
