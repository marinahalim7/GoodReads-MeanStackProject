import { BookService } from './../../../services/book.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { FormGroup, FormBuilder, Validators,FormControl } from '@angular/forms';
import { UserReviewsService } from 'src/app/services/user-reviews.service';
@Component({
  selector: 'app-bookdetails',
  templateUrl: './bookdetails.component.html',
  styleUrls: ['./bookdetails.component.scss']
})
export class BookdetailsComponent implements OnInit ,OnDestroy{
  bookId:any='';
  userID:any='';
  book:any;
  public form!: FormGroup;
  unsub:any='';
  value:any;
  comments!:any[];
  registerForm = new FormGroup({
    comment: new FormControl(null),
    
  })
  constructor(private _BookService:BookService,private _ActivatedRoute:ActivatedRoute,private fb: FormBuilder,private _UserReviewsService:UserReviewsService){
   /* this.form = this.fb.group({
      rating1: ['', Validators.required],
      rating2: [4]
    });*/
  }
 
  ngOnInit(): void {
    this.bookId=this._ActivatedRoute.snapshot.paramMap.get("id");
    const token:any = localStorage.getItem("userToken");
    let decode:any = jwtDecode(token);
    this.userID = decode.user_id;
    this.unsub= this._BookService.getDetailsBook(this.bookId).subscribe((data)=>{
    this.book=data;
    
   // this.comments=[555,54];
    });
   // this.value=5;
  
    
  }

  onSubmit(event:any){
    console.log(event.target.comm.value);
    this.comments.push(event.target.comm.value);
    const reviewObj={
      comment:[event.target.comm.value],
      user_id:this.userID
    }
    this._UserReviewsService.updateReview(reviewObj,this.bookId).subscribe((response)=>{
    })

  }
  
  fun(event:any){
    console.log(event);
  }

  chooseState(stat:String):void{
    const reviewObj={
      state:stat,
      user_id:this.userID
    }
    this._UserReviewsService.updateReview(reviewObj,this.bookId).subscribe((response)=>{
    })
          
  }

  chooseRating(starNumber:Number){
    console.log(starNumber);
    if(starNumber == null){
      starNumber=0;
    }
    const reviewObj={
      rate:starNumber,
      user_id:this.userID
    }
    this._UserReviewsService.updateReview(reviewObj,this.bookId).subscribe((response)=>{
    })
  
  }
  ngOnDestroy(): void {
    this.unsub.unsubscribe();
  }
}
