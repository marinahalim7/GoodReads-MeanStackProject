import { Component } from '@angular/core';
import { FormControl, FormControlName, FormGroup, FormGroupName, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private _AuthService: AuthService, private _Router:Router) { }
  registerForm = new FormGroup({
    username: new FormControl(null,
      [Validators.required, Validators.minLength(2), Validators.maxLength(10)]),
    lastname: new FormControl(null,
      [Validators.required, Validators.minLength(2), Validators.maxLength(10)]),
    email: new FormControl(null,
      [Validators.required, Validators.email]),
    password: new FormControl(null,
      [Validators.required, Validators.minLength(2)])
  })
  onClickSubmit(registerForm: FormGroup) {
    this._AuthService.register(registerForm.value).subscribe((response) => {
      console.log(registerForm.value);
      if (!response.error) {
          (<any>this._Router).navigate(['/login'])
        console.log("success");
      }
      else {
        console.log("failed");
      }
    }
    )
  }
}