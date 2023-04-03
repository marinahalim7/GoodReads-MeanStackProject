import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { FormGroup, FormBuilder, Validators,FormControl } from '@angular/forms';
import { UserReviewsService } from 'src/app/services/user-reviews.service';
import { BookService } from 'src/app/services/book.service';
@Component({
  selector: 'app-bookdetails',
  templateUrl: './bookdetails.component.html',
  styleUrls: ['./bookdetails.component.scss']
})
export class BookdetailsComponent {
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
    });
  
  
    
  }

  onSubmit(event:any){
    console.log(event.target.comm.value);
   // this.comments.push(event.target.comm.value);
    const reviewObj={
      comment:[event.target.comm.value],
      user_id:this.userID
    }
    this._UserReviewsService.updateReview(reviewObj,this.bookId).subscribe((response)=>{
    });

  }

  chooseState(stat:String):void{
    const reviewObj={
      state:stat,
      user_id:this.userID
    }
    this._UserReviewsService.updateReview(reviewObj,this.bookId).subscribe((response)=>{
    })
          
  }

  chooseRating(event:any){
    console.log(event.value);
    const reviewObj={
      rate:event.value,
      user_id:this.userID
    }
    this._UserReviewsService.updateReview(reviewObj,this.bookId).subscribe((response)=>{
    })
  
  }
  onCancledRating(){
    const reviewObj={
      rate:0,
      user_id:this.userID
    }
    this._UserReviewsService.updateReview(reviewObj,this.bookId).subscribe((response)=>{
    })
  }
  ngOnDestroy(): void {
    this.unsub.unsubscribe();
  }

}
