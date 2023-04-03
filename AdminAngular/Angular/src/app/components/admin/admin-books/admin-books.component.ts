import { Component, OnInit } from '@angular/core';
import { AdminBooksService } from 'src/app/services/Admin/admin-books.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators, AbstractControl, FormArray, FormsModule } from '@angular/forms';
import { IBook } from 'src/app/interfaces/bookInterface';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AdminAuthorsService } from 'src/app/services/Admin/admin-authors.service';
import { IAuthor } from '../../../interfaces/authorInterface';
import { ICateogry } from '../../../interfaces/cateogryInterface';
import { AdminCateogriesService } from 'src/app/services/Admin/admin-cateogries.service';

@Component({
  selector: 'app-admin-books',
  templateUrl: './admin-books.component.html',
  styleUrls: ['./admin-books.component.scss'],
  styles: [`
  :host ::ng-deep .p-dialog .product-image {
      width: 150px;
      margin: 0 auto 2rem auto;
      display: block;
  }
`],
  providers: [MessageService, ConfirmationService]

})
export class AdminBooksComponent implements OnInit {
  selectedFile?: File;
  title = 'refreshPage';
  constructor(private AdminBooksService: AdminBooksService, private AdminAuthorsService: AdminAuthorsService, private AdminCateogriesService: AdminCateogriesService, private messageService: MessageService, private confirmationService: ConfirmationService, public _Router: Router, public _location: Location, private _ActivatedRoute: ActivatedRoute) {

  }
  refresh(): void {
    this._Router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
       console.log("in functionrefresh");
      console.log(decodeURI(this._location.path()));

      (<any>this._Router).navigate([decodeURI(this._location.path())]);
    });
  }

  bookNames: any[] = [];
  error: string = '';
  postBookDataForm = new FormGroup({
    name: new FormControl(null, [Validators.minLength(3), Validators.maxLength(10), Validators.required]),
    author_id: new FormControl(null, [Validators.required]),
    category_id: new FormControl(null, [Validators.required]),
    image: new FormControl(null, [Validators.required])
  })
  // postBookDataForm
  submitpostBookDataForm(postBookDataForm: FormGroup) {
    // postBookDataForm.controls['author_id'].value=postBookDataForm.controls['author_id'].value.split(" ")[0];
    // postBookDataForm.value.category_id=postBookDataForm.value.category_id.split(" ")[0];
    console.log("fgggggggggggggggggggggg");
    
    //console.log(decodeURI(this._location.path()));
    const formdata = new FormData();

    formdata.append("name", postBookDataForm.controls['name'].value)
    formdata.append("author_id", postBookDataForm.controls['author_id'].value)
    formdata.append("category_id", postBookDataForm.controls['category_id'].value)

    if (this.selectedFile) {
      formdata.append("image", this.selectedFile, this.selectedFile.name);
    }

    this.AdminBooksService.postAdminBooks(formdata).subscribe((response) => {
      if (response.name != null) {

        console.log("post book data success");
        console.log("regreshhhhh");
        
        this.refresh();      }
      else {
        this.error = response.message;
      }
    })
  }

  selectImgFun(e: any) {
    console.log(e);
    this.selectedFile = e.target.files[0];
  }

  // delete book
  deletebook(id: any) {
    console.log(id);
    this.AdminBooksService.deleteAdminBook(id).subscribe((response) => {
      if (response.name != null) {
        console.log("delete book sucess");
        console.log("refresh");
        
        this.refresh();
        alert("data deleted");
        
      }
      else {
        this.error = response.message;
      }
    })
  }

  // edit book
  bookNamesupdate: any[] = [];
  editBookDataForm = new FormGroup({
    name: new FormControl(null, [Validators.minLength(3), Validators.maxLength(10), Validators.required]),
    author_id: new FormControl(null, [Validators.required]),
    category_id: new FormControl(null, [Validators.required]),
    image: new FormControl(null, [Validators.required]),
  })

  selectedFileUpdate?: File;
  submiteditBookDataForm(id: any, editBookDataForm: FormGroup) {
    const formdataedit = new FormData();
    formdataedit.append("name", editBookDataForm.controls['name'].value)
    formdataedit.append("author_id", editBookDataForm.controls['author_id'].value)
    formdataedit.append("category_id", editBookDataForm.controls['category_id'].value)

    if (this.selectedFileUpdate) {
      formdataedit.append("image", this.selectedFileUpdate, this.selectedFileUpdate.name);

    }
    this.AdminBooksService.updateAdminBooks(id, formdataedit)
      .subscribe((response) => {
        //console.log(id);
        //console.log(formdataedit);
        if (response.name != null) {
          console.log("edit book data success");
          console.log("please error");
          
          this.refresh();
        }
        else {
          this.error = response.message;
        }
      })
  }

  selectImgFunedit(e: any) {
    console.log(e);
    this.selectedFileUpdate = e.target.files[0];
  }

  //get books and it's dilaog message
  bookDialog!: boolean;
  books!: IBook[];
  book!: IBook;
  selectedbooks!: IBook[];
  submitted!: boolean;
  statuses!: any[];

  ngOnInit() {
    this.AdminBooksService.getAdminBooks().subscribe((data) => {
      this.books = data;
    })

    // get name of author when post book
    this.AdminAuthorsService.getAdminAuthors().subscribe((data) => {
      this.nameOfAuthors = data;
      this.firstNameOfAuthors = this.nameOfAuthors.map(a => {
        console.log(a._id);
        return { Id: a._id, name: a.first_name };
      })
      console.log(this.firstNameOfAuthors);
    })
    console.log(this.firstNameOfAuthors);

    // get name of cateogry when post book
    this.AdminCateogriesService.getAdminCateogries().subscribe((data) => {
      this.nameOfCateogries = data;
      this.firstNameOfCateogry = this.nameOfCateogries.map(a => {
        console.log(a._id);
        return { Id: a._id, name: a.name };
      })
      console.log(this.firstNameOfCateogry);

    })
    console.log(this.firstNameOfCateogry);

  }


  openNew() {
    this.book = {};
    this.submitted = false;
    this.bookDialog = true;
  }

  hideDialog() {
    this.bookDialog = false;
    this.submitted = false;
  }

  saveAuthor() {
    this.submitted = true;

    if (this.book.name?.trim()) {
      if (this.book._id) {
        this.books[this.findIndexById(this.book._id)] = this.book
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Author Updated', life: 3000 });
      }
      else {
        this.book._id = this.createId();
        this.book.img = 'product-placeholder.svg';
        this.books.push(this.book);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Author Created', life: 3000 });
      }
      this.books = [...this.books];
      this.bookDialog = false;
      this.book = {};
    }
  }


  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.books.length; i++) {
      if (this.books[i]._id === id) {
        index = i;
        break;
      }
    }
    return index;
  }


  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  displayStyle = "none";
  displayStyle2 = "none";



  // post popup
  openPopup() {
    this.displayStyle = "block";
  }

  closePopup() {
    this.displayStyle = "none";
  }

  updatedBookId!: any;

  // edit popup
  openPopup2(id: any) {
    this.displayStyle2 = "block";
    this.updatedBookId = id;
  }

  closePopup2() {
    this.displayStyle2 = "none";
  }


  nameOfAuthors: IAuthor[] = [];
  firstNameOfAuthors: any[] = [];
  // nameOfCategories: any[] = [];
  selected!: string;
  onChange(event: any) {
    console.log(event.value);
  }

  nameOfCateogries: ICateogry[] = [];
  firstNameOfCateogry: any[] = [];
  selectedCat!: string;
  onChange2(event: any) {
    console.log(event.value);
  }


}

