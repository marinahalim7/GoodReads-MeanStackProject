import { BookService } from './../../../services/book.service';
import { Component } from '@angular/core';
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent {
  books:any[]=[];
  constructor(private _BookService:BookService){
    _BookService.getAllBooks().subscribe((data)=>{
      console.log(data);
      this.books=data;
    })
}
}
