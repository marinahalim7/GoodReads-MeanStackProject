import { Component, OnInit } from '@angular/core';
import { AdminAuthorsService } from 'src/app/services/Admin/admin-authors.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators, AbstractControl, FormArray } from '@angular/forms';
import { IAuthor } from '../../../interfaces/authorInterface';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-authors',
  templateUrl: './admin-authors.component.html',
  styleUrls: ['./admin-authors.component.scss'],
  styles: [`
  :host ::ng-deep .p-dialog .product-image {
      width: 150px;
      margin: 0 auto 2rem auto;
      display: block;
  }
`],
  providers: [MessageService, ConfirmationService]
})


export class AdminAuthorsComponent implements OnInit {
  selectedFile?:File;
  title = 'refreshPage';
  constructor(private _AdminAuthorsService: AdminAuthorsService, private messageService: MessageService, private confirmationService: ConfirmationService, public _Router: Router, public _location: Location, private _ActivatedRoute: ActivatedRoute) {
  }

  refresh(): void {
    this._Router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
      console.log(decodeURI(this._location.path()));

      (<any>this._Router).navigate([decodeURI(this._location.path())]);
    });
  }

// post author
  authorNames: any[] = [];
  error: string = '';
  postAuthorDataForm = new FormGroup({
    first_name: new FormControl(null, [Validators.minLength(3), Validators.maxLength(10), Validators.required]),
    last_name: new FormControl(null, [Validators.minLength(3), Validators.maxLength(10), Validators.required]),
    Date_of_birth: new FormControl(null, [Validators.required]),
    image: new FormControl(null, [Validators.required])
  })


// method to submit postAuthorDataForm
  submitpostAuthorDataForm(postAuthorDataForm: FormGroup) {
    const formdata = new FormData();

    formdata.append("first_name",postAuthorDataForm.controls['first_name'].value)
    formdata.append("last_name",postAuthorDataForm.controls['last_name'].value)
    formdata.append("Date_of_birth",postAuthorDataForm.controls['Date_of_birth'].value)

     if(this.selectedFile){
      formdata.append("image", this.selectedFile, this.selectedFile.name);

     }
    this._AdminAuthorsService.postAdminAuthors(formdata)
      .subscribe((response) => {
        if (response.first_name != null) {
          console.log("post author data success");
          this.refresh();
        }
        else {
          this.error = response.message;
        }
      })

  }


selectImgFun(e:any){
console.log(e);
this.selectedFile = e.target.files[0];
}


//delete data
  deleteAuthor(id: any) {
    console.log(id);
    this._AdminAuthorsService.deleteAdminAuthor(id).subscribe((response) => {
      if (response.first_name != null) {
        console.log("delete author sucess");
        this.refresh();
        alert("data deleted");
      }
      else {
        this.error = response.message;
      }
    })
  }

// update author
  authorNamesupdate: any[] = [];
  editAuthorDataForm = new FormGroup({
    first_name: new FormControl(null, [Validators.minLength(3), Validators.maxLength(10), Validators.required]),
    last_name: new FormControl(null, [Validators.minLength(3), Validators.maxLength(10), Validators.required]),
    Date_of_birth: new FormControl(null, [Validators.required]),
    image: new FormControl(null, [Validators.required])
  })


 //submit editAuthorDataForm
 selectedFileUpdate?:File;
 submiteditAuthorDataForm(id:any, editAuthorDataForm: FormGroup) {
  const formdataedit = new FormData();
  formdataedit.append("first_name", editAuthorDataForm.controls['first_name'].value)
  formdataedit.append("last_name", editAuthorDataForm.controls['last_name'].value)
  formdataedit.append("Date_of_birth", editAuthorDataForm.controls['Date_of_birth'].value)

if(this.selectedFileUpdate){
  formdataedit.append("image",this.selectedFileUpdate, this.selectedFileUpdate.name);
}
  this._AdminAuthorsService.updateAdminAuthors(id,formdataedit)
    .subscribe((response) => {
      //this.authorNamesupdate = editAuthorDataForm.value;
      if (response.first_name != null) {
        console.log("edit author data success");
        this.refresh();
        //this._Router.navigate([self]);
      }
      else {
        this.error = response.message;
      }
    })
}
selectImgFunedit(e:any){
  console.log(e);
  this.selectedFileUpdate = e.target.files[0];
  }

// get author and it's dilaog message
  authorDialog!: boolean;
  authors!: IAuthor[];
  author!: IAuthor;
  selectedauthors!: IAuthor[];
  submitted!: boolean;
  statuses!: any[];
  ngOnInit() {
    this._AdminAuthorsService.getAdminAuthors().subscribe((data) => {
      this.authors = data;
    })
  }

  openNew() {
    this.author = {};
    this.submitted = false;
    this.authorDialog = true;
  }

  hideDialog() {
    this.authorDialog = false;
    this.submitted = false;
  }

  saveAuthor() {
    this.submitted = true;

    if (this.author.first_name?.trim()) {
      if (this.author._id) {
        this.authors[this.findIndexById(this.author._id)] = this.author
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Author Updated', life: 3000 });
      }
      else {
        this.author._id = this.createId();
        this.author.img = 'product-placeholder.svg';
        this.authors.push(this.author);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Author Created', life: 3000 });
      }
      this.authors = [...this.authors];
      this.authorDialog = false;
      this.author = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.authors.length; i++) {
      if (this.authors[i]._id === id) {
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
updatedAuthorId!:any;

// edit popup
  openPopup2(id:any) {
    this.displayStyle2 = "block";
    this.updatedAuthorId = id;
  }

  closePopup2() {
    this.displayStyle2 = "none";
  }

}



