import { Component, OnInit } from '@angular/core';
import { AdminCateogriesService } from 'src/app/services/Admin/admin-cateogries.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators, AbstractControl, FormArray } from '@angular/forms';
import { ICateogry } from 'src/app/interfaces/cateogryInterface';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-cateogries',
  templateUrl: './admin-cateogries.component.html',
  styleUrls: ['./admin-cateogries.component.scss'],
  styles: [`
  :host ::ng-deep .p-dialog .product-image {
      width: 150px;
      margin: 0 auto 2rem auto;
      display: block;
  }
`],
providers: [MessageService, ConfirmationService]
})
export class AdminCateogriesComponent implements OnInit {

  title = 'refreshPage';
  constructor(private _AdminCateogriesService: AdminCateogriesService, private messageService: MessageService, private confirmationService: ConfirmationService, public _Router: Router, public _location: Location, private _ActivatedRoute: ActivatedRoute) {

  }
  refresh(): void {
    this._Router.navigateByUrl("/refresh", { skipLocationChange: true }).then(() => {
      console.log(decodeURI(this._location.path()));

      (<any>this._Router).navigate([decodeURI(this._location.path())]);
    });
  }

  // logic of post author ////////////////////
  CateogryNames: any[] = [];
  error: string = '';
  postCateogryDataForm = new FormGroup({
    name: new FormControl(null, [Validators.minLength(3), Validators.maxLength(10), Validators.required]),
  })


  // method to submit postAuthorDataForm
  submitpostCateogryDataForm(postCateogryDataForm: FormGroup) {
    this._AdminCateogriesService.postAdminCateogries(postCateogryDataForm.value)
      .subscribe((response) => {
        if (response.name != null) {
          console.log("post cateogry data success");
          this.refresh();
          //this._Router.navigate([self]);
        }
        else {
          this.error = response.message;
        }
      })
  }

    //////////////////////////////////////////////////////////
  // method to delete data
  deleteCateogry(id: any) {

    console.log(id);
    this._AdminCateogriesService.deleteAdminCateogries(id).subscribe((response) => {
      if (response.name != null) {
        console.log("delete cateogry sucess");
        this.refresh();
        alert("data deleted");
      }
      else {
        this.error = response.message;
      }
    })
  }


 /////////////////////////////////////////////////////
  //method to update author
  cateogryNamesupdate: any[] = [];
  editcateogryDataForm = new FormGroup({
    name: new FormControl(null, [Validators.minLength(3), Validators.maxLength(10), Validators.required]),
    _id: new FormControl(null)
  })

   // method to submit editAuthorDataForm
 submiteditCateogryDataForm(id:any, editcateogryDataForm: FormGroup) {

  this._AdminCateogriesService.updateAdminCateogries(id,editcateogryDataForm.value)
    .subscribe((response) => {
      console.log(id);
      console.log(editcateogryDataForm);
      if (response.name != null) {
        console.log("edit cateogry data success");
        this.refresh();
        //this._Router.navigate([self]);
      }
      else {
        this.error = response.message;
      }
    })

}

  // logic of get author and it's dilaog message
  cateogryDialog!: boolean;
  cateogries!: ICateogry[];
  cateogry!: ICateogry;
  selectedcateogries!: ICateogry[];
  submitted!: boolean;
  statuses!: any[];
  ngOnInit() {
    this._AdminCateogriesService.getAdminCateogries().subscribe((data) => {
      this.cateogries = data;
    })
  }

  openNew() {
    this.cateogry = {};
    this.submitted = false;
    this.cateogryDialog = true;
  }

  hideDialog() {
    this.cateogryDialog = false;
    this.submitted = false;
  }

  saveCateogry() {
    this.submitted = true;

    if (this.cateogry.name?.trim()) {
      if (this.cateogry._id) {
        this.cateogries[this.findIndexById(this.cateogry._id)] = this.cateogry
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Author Updated', life: 3000 });
      }
      else {
        this.cateogry._id = this.createId();
        //this.cateogry.img = 'product-placeholder.svg';
        this.cateogries.push(this.cateogry);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Author Created', life: 3000 });
      }
      this.cateogries = [...this.cateogries];
      this.cateogryDialog = false;
      this.cateogry = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.cateogries.length; i++) {
      if (this.cateogries[i]._id === id) {
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

updatedCateogryId!:any;
// edit popup
  openPopup2(id:any) {
    this.displayStyle2 = "block";
    this.updatedCateogryId = id;
  }

  closePopup2() {
    this.displayStyle2 = "none";
  }

}
