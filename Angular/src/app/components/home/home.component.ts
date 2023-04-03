import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { __param } from 'tslib';
import jwtDecode from 'jwt-decode';
import { UserReviewsService } from 'src/app/services/user-reviews.service';
import { BookService } from 'src/app/services/book.service';
import { AuthService } from 'src/app/services/auth.service';
import {MatCardModule} from '@angular/material/card';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  
  books: any[] = [];
  title = 'my-app';
  selectdMenu: any = 'Home';
  userID: any;
  value: number=2;
  selectvalue:any;
  constructor(private _HttpClient: HttpClient, private _BookService: BookService, private _AuthService: AuthService ,private _UserReviewsService:UserReviewsService  ) {
  }
  

  ngOnInit(): void {
    const token:any = localStorage.getItem("userToken");
    let decode:any = jwtDecode(token);
    this.userID = decode.user_id;
    this.selectBooks("all");
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
    console.log(event);
    if(event.value== null){
      event=0;
    }
    const reviewObj={
      rate:event.value,
      user_id:this.userID
    }
    this._UserReviewsService.updateReview(reviewObj,bookId).subscribe((response)=>{
    })
    

    

  } 
  onCancledRating(bookId:any) {
   
   
    const reviewObj={
      rate:0,
      user_id:this.userID
    }
    this._UserReviewsService.updateReview(reviewObj,bookId).subscribe((response)=>{
    })
  }

}
