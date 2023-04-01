import { AuthorService } from './../../../services/author.service';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
@Component({
  selector: 'app-authordetails',
  templateUrl: './authordetails.component.html',
  styleUrls: ['./authordetails.component.scss']
})
export class AuthordetailsComponent {
  id:any='';
  authorDetails:any;
  constructor(private _ActivatedRoute:ActivatedRoute,private _AuthorService:AuthorService){
    this.id=this._ActivatedRoute.snapshot.paramMap.get("id");
    console.log(this.id);
    this._AuthorService.getAuthorDetails(this.id).subscribe((data)=>{
      this.authorDetails=data;
      console.log( this.authorDetails);
    })
}
}