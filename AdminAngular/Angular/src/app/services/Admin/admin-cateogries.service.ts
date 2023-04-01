import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ICateogry} from '../../interfaces/cateogryInterface'


@Injectable({
  providedIn: 'root'
})
export class AdminCateogriesService {

  constructor(private _HttpClient:HttpClient) { }
  // get all categories
  getAdminCateogries():Observable<any>{
    return this._HttpClient.get("http://localhost:5000/admin/category")
  }

  // post authors
  postAdminCateogries(postCateogryData:any):Observable<any>{
    console.log(postCateogryData)
    return this._HttpClient.post('http://localhost:5000/admin/category',postCateogryData);
   }

   // delete authors
   deleteAdminCateogries(id:number):Observable<any>{
   return this._HttpClient.delete(`http://localhost:5000/admin/category/${id}`)
   }

   // update authors
   updateAdminCateogries(id:any, editCateogryData:ICateogry):Observable<any>{
     console.log(id);
     console.log(editCateogryData);
     return this._HttpClient.put(`http://localhost:5000/admin/category/${id}`,editCateogryData)
   }



}
