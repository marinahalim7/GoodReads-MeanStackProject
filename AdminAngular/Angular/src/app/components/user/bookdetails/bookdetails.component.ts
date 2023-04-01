import { AuthorService } from './../../../services/author.service';
import { BookService } from './../../../services/book.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-bookdetails',
  templateUrl: './bookdetails.component.html',
  styleUrls: ['./bookdetails.component.scss']
})
export class BookdetailsComponent {
  id:any='';
  bookDetails:any;
  currentUser=new BehaviorSubject(null);
  constructor(private _BookService:BookService,private _ActivatedRoute:ActivatedRoute){
    this.id=this._ActivatedRoute.snapshot.paramMap.get("id");
    _BookService.getDetailsBook(this.id).subscribe((data)=>{
      //console.log(data);
      this.bookDetails=data;
    })
    }
     chooseState(state:String){
      let token:any = localStorage.getItem('userToken');
      this.currentUser.next(jwtDecode(token));
      console.log(state,this.currentUser.value);
     // console.log(this.currentUser.value.user_id);
      //this._BookService.addBook_to_User(state,this.currentUser._id).subscribe((res)=>{
        //console.log(res);
      //})
    }
}