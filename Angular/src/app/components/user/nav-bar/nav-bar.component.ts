import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
AuthService
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  isLogin: boolean = false;
  constructor(private _AuthService: AuthService) {
    _AuthService.currentUser.subscribe(() => {
      if (_AuthService.currentUser.getValue() != null) {
        this.isLogin = true;
      }
      else {
        this.isLogin = false;
      }
    })
  }
  isLogout() {
    this._AuthService.logout();
  }
}
