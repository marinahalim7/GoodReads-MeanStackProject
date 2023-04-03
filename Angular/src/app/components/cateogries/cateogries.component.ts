import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CateogriesService } from 'src/app/services/cateogries.service';
@Component({
  selector: 'app-cateogries',
  templateUrl: './cateogries.component.html',
  styleUrls: ['./cateogries.component.scss']
})
export class CateogriesComponent {
  Cateogries:any[]=[];
  id:string="";
  cateogryDetails:any[]=[];
  unsub_catService:any=null;
  constructor(private _CateogriesService:CateogriesService,private  _ActivatedRoute:ActivatedRoute){ }
  
  ngOnInit(): void {
    this.id=this._ActivatedRoute.snapshot.params['id'];
    this.unsub_catService=this._CateogriesService.getAllCateogries().subscribe( (data)=>{
      this.Cateogries=data;
    })
  }
  ngOnDestroy(): void {
    this.unsub_catService.unsubscribe();
  }

}
