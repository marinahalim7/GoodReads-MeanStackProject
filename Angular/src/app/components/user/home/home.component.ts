import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { __param } from 'tslib';
import { BookService } from './../../../services/book.service';
import { AuthService } from 'src/app/auth.service';
import jwtDecode from 'jwt-decode';
import { UserReviewsService } from 'src/app/services/user-reviews.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  books: any[] = [];
  title = 'my-app';
  selectdMenu: any = 'Home';
  userID: any;
  constructor(private _HttpClient: HttpClient, private _BookService: BookService, private _AuthService: AuthService ,private _UserReviewsService:UserReviewsService  ) {}

  ngOnInit(): void {
    const token:any = localStorage.getItem("userToken");
    let decode:any = jwtDecode(token);
    this.userID = decode.user_id;
  }
  selectBooks(selectOption:any){
    const selctObj={
      state:selectOption,
      user_id:this.userID,
  }
  console.log(selctObj);
  this._UserReviewsService.getBookOfUSer(selctObj).subscribe((data)=>{
    this.books=data;
    console.log(data);
  });
  
  //console.log(selctObj);
  }
  
  onRatingChanged(event:any,bookId:any){
    if(event == null){
      event=0;
    }
    const reviewObj={
      rate:event,
      user_id:this.userID
    }
    this._UserReviewsService.updateReview(reviewObj,bookId).subscribe((response)=>{
    })
    

    

  }  
  }


  