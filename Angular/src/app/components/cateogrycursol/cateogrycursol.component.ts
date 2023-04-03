import { Component, Input, OnInit,OnDestroy } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CateogriesService } from 'src/app/services/cateogries.service';
import { CarouselModule } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-cateogrycursol',
  templateUrl: './cateogrycursol.component.html',
  styleUrls: ['./cateogrycursol.component.scss']
})
export class CateogrycursolComponent {
  unsub_catService:any=null;
  books:any[]=[];
  @Input() parentData:String='';
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    margin:8,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 6
      },
      940: {
        items: 6
      }
    },
    nav: true
  }

constructor(private _CateogriesService:CateogriesService){}

ngOnInit(): void {
  this.unsub_catService=this._CateogriesService.getCateogryDetails(this.parentData).subscribe((data)=>{
      this.books=data;
  })
}
ngOnDestroy(): void {
  this.unsub_catService.unsubscribe();
}

}
