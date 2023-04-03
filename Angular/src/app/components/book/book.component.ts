
import { Component , OnDestroy, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent {
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
