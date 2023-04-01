import { Component, OnInit } from '@angular/core';
import { AdminAuthorsService } from 'src/app/services/Admin/admin-authors.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit{
  images!: any[];

  responsiveOptions:any[] = [
      {
          breakpoint: '1024px',
          numVisible: 5
      },
      {
          breakpoint: '768px',
          numVisible: 3
      },
      {
          breakpoint: '560px',
          numVisible: 1
      }
  ];
  constructor(private _AdminAuthorsService: AdminAuthorsService) { }

  ngOnInit() {
    this._AdminAuthorsService.getAdminAuthors().subscribe((data)=>{
      this.images = data
    })
     // this.photoService.getImages().then(images => this.images = images)
  
  }
}

