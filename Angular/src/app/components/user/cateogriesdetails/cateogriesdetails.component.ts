import { CateogriesService } from './../../../services/cateogries.service';
import { ActivatedRoute } from '@angular/router';
import { Component,OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-cateogriesdetails',
  templateUrl: './cateogriesdetails.component.html',
  styleUrls: ['./cateogriesdetails.component.scss']
})
export class CateogriesdetailsComponent implements OnInit,OnDestroy{
  id:string="";
  cateogryDetails:any[]=[];
  unsub_catService:any=null;

  constructor(private  _ActivatedRoute:ActivatedRoute, private _CateogriesService:CateogriesService){}
  
  ngOnInit(): void {
    this.id=this._ActivatedRoute.snapshot.params['id'];
    this.unsub_catService= this._CateogriesService.getCateogryDetails(this.id).subscribe((data)=>{
      this.cateogryDetails=data;
    })
  }
  ngOnDestroy(): void {
    this.unsub_catService.unsubscribe();
  }

}
