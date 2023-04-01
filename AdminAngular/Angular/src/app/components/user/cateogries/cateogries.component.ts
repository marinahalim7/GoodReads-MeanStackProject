import { CateogriesService } from './../../../services/cateogries.service';
import { Component } from '@angular/core';
@Component({
  selector: 'app-cateogries',
  templateUrl: './cateogries.component.html',
  styleUrls: ['./cateogries.component.scss']
})
export class CateogriesComponent {
  Cateogries:any[]=[];
  constructor(private _CateogriesService:CateogriesService){
    this._CateogriesService.getAllCateogries().subscribe( (data)=>{
      console.log(data);
      this.Cateogries=data;
    })
  }
}