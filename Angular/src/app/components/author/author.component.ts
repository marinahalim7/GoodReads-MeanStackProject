import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit,OnDestroy{

  authors:any[]=[];
  unsub_autorService:any=null;
  constructor(private  _AuthorService:AuthorService){}

  ngOnInit(): void {
    this.unsub_autorService=this._AuthorService.getAllauthor().subscribe( (data)=>{
      this.authors=data;
    })
  }
  ngOnDestroy(): void {
    this.unsub_autorService.unsubscribe();
  }
}
