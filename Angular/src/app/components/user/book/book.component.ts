import { BookService } from './../../../services/book.service';
import { Component , OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit,OnDestroy {
  books:any[]=[];
  unsub_bookService:any=null;
  constructor(private _BookService:BookService){}
  ngOnInit(): void {
  this.unsub_bookService=this._BookService.getAllBooks().subscribe((data)=>{
    this.books=data;
  })
  }
  ngOnDestroy(): void {
  this.unsub_bookService.unsubscribe();
  }
}
