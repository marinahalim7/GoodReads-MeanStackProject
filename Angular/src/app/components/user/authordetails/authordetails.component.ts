import { AuthorService } from './../../../services/author.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserReviewsService } from 'src/app/services/user-reviews.service';
import jwtDecode from 'jwt-decode';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-authordetails',
  templateUrl: './authordetails.component.html',
  styleUrls: ['./authordetails.component.scss']
})
export class AuthordetailsComponent implements OnInit ,OnDestroy{
  id:any='';
  authorDetails:any;
  userID:any='';
  unsub_AuthorSer:any='';
  unsub__UserReviewsSer:any='';
  public form!: FormGroup;
  constructor(private _ActivatedRoute:ActivatedRoute,private fb: FormBuilder,private _AuthorService:AuthorService,private _UserReviewsService:UserReviewsService) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      rating1: ['', Validators.required],
      rating2: [4]
    });
    this.id=this._ActivatedRoute.snapshot.paramMap.get("id");
    console.log(this.id);
    this.unsub_AuthorSer=this._AuthorService.getAuthorDetails(this.id).subscribe((data)=>{      
      this.authorDetails=data;
    })
    const token:any = localStorage.getItem("userToken");
    let decode:any = jwtDecode(token);
    this.userID = decode.user_id;
  }

  chooseState(stat:String,bookId:any):void{
      const reviewObj={
      state:stat,
      user_id:this.userID
    }
    this.unsub__UserReviewsSer=this._UserReviewsService.updateReview(reviewObj,bookId).subscribe((response)=>{
    })
          
  }

  chooseRating(starNumber:Number,bookId:any){
    
    const reviewObj={
      rate:starNumber,
      user_id:this.userID
    }
    console.log(reviewObj);
    this.unsub__UserReviewsSer=this._UserReviewsService.updateReview(reviewObj,bookId).subscribe((response)=>{
    })
  }
  
  ngOnDestroy(): void {
    this.unsub_AuthorSer.unsubscribe();
    this.unsub__UserReviewsSer.unsubscribe();
  }

  }
                       
  


