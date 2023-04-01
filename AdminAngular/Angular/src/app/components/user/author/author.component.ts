import { AuthorService } from './../../../services/author.service';
import { Component } from '@angular/core';
@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent {
  authors:any[]=[];
  constructor(private  _AuthorService:AuthorService){
    this._AuthorService.getAllauthor().subscribe( (data)=>{
      console.log(data);
      this.authors=data;
    })
  }
}