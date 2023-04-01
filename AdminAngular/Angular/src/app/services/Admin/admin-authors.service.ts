import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAuthor } from "../../interfaces/authorInterface"

@Injectable({
  providedIn: 'root'
})


export class AdminAuthorsService {
  constructor(private _HttpClient:HttpClient) { }

  // get all authors
  getAdminAuthors():Observable<any>{
    return this._HttpClient.get("http://localhost:5000/admin/author")
  }

  // get author by id
  getSingleAuthor(id: string):Observable<any>{
    return this._HttpClient.get(`http://localhost:5000/admin/author/${id}`)
  }

  // post authors
  postAdminAuthors(postAuthorData:any):Observable<any>{
   console.log(postAuthorData)
   return this._HttpClient.post('http://localhost:5000/admin/author',postAuthorData);
  }

  // delete authors
  deleteAdminAuthor(id:number):Observable<any>{
    return this._HttpClient.delete(`http://localhost:5000/admin/author/${id}`)

  }

  // update authors
  updateAdminAuthors(id:any, editAuthorData:IAuthor):Observable<any>{
    console.log(id);
    console.log(editAuthorData);
    return this._HttpClient.put(`http://localhost:5000/admin/author/${id}`,editAuthorData)
  }
}
