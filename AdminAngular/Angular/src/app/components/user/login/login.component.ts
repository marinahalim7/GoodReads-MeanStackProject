import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
constructor(private _AuthService:AuthService , private _Router:Router){}
error:string=""
registerForm = new FormGroup({
  email: new FormControl(null,
    [Validators.required, Validators.email]),
  password: new FormControl(null,
    [Validators.required, Validators.minLength(2)])
})
onClickSubmit(registerForm: FormGroup) {
  this._AuthService.login(registerForm.value).subscribe((response) => {
    console.log(registerForm.value);
    if (!response.error) {
        console.log("tttttttttttttt");
      console.log("success");
      localStorage.setItem('userToken',response.token);
      this._AuthService.saveCurrentUser();
      (<any>this._Router).navigate(['/home'])
      console.log(response.token);
    }
    else
     {
    this.error=response.error
    console.log("ffffffffffffffffffffff");
      console.log(response.error);
    }
  }
  )
}
}