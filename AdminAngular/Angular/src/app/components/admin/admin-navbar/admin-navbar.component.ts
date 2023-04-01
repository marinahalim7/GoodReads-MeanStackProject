import { Component, OnInit } from '@angular/core';
import { LoginadminAuthService } from 'src/app/services/Admin/loginadmin-auth.service';


@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.scss']
})
export class AdminNavbarComponent implements OnInit {

  isLogin:boolean = false;
  constructor(private _LoginadminAuthService:LoginadminAuthService){
 
    _LoginadminAuthService.currentAdmin.subscribe(()=>{

      if(_LoginadminAuthService.currentAdmin.getValue() != null)
      {
        this.isLogin = true;
      }
      else{
        this.isLogin = false;
      }
    })
  }

  
  ngOnInit(): void {
    
  }
}
