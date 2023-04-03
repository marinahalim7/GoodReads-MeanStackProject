import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginadminAuthService } from 'src/app/services/Admin/loginadmin-auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})


export class AdminLoginComponent implements OnInit{
  constructor(private _LoginadminAuthService: LoginadminAuthService, private _Router:Router){ }
  loginForm = new FormGroup({
  email: new FormControl(null,[Validators.email, Validators.required]),
  password: new FormControl(null,[Validators.required,Validators.pattern('^[a-zA-Z0-9_-]{5,15}$')]),

})
error:string = '';
submitLoginAdminForm(loginForm:FormGroup){
//console.log(loginForm.value);

this._LoginadminAuthService.loginAdmin(loginForm.value).subscribe((response)=>{
if(response.message == 'success')
{
  localStorage.setItem('adminToken',response.token);
  this._LoginadminAuthService.saveCurrentAdmin();
  console.log("navigate");
  (<any>this._Router).navigate(['/AdminHome']);
}
else{
  console.log("errrssssssss");
  this.error = response.message;
  console.log("test");
  console.log(response.message)
  console.log(this.error);
}
})
}


ngOnInit(): void {}

}
