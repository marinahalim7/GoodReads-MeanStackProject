import { CateogriesService } from './../../../services/cateogries.service';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
@Component({
  selector: 'app-cateogriesdetails',
  templateUrl: './cateogriesdetails.component.html',
  styleUrls: ['./cateogriesdetails.component.scss']
})
export class CateogriesdetailsComponent {
  id:string="";
  cateogryDetails:any[]=[];
  constructor(private  _ActivatedRoute:ActivatedRoute, private _CateogriesService:CateogriesService){
    this.id=this._ActivatedRoute.snapshot.params['id'];
    console.log(this.id);
  _CateogriesService.getCateogryDetails(this.id).subscribe((data)=>{
    this.cateogryDetails=data;
    console.log(data);
    })
  }
}