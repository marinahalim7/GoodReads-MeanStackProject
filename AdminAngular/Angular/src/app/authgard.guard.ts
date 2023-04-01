import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginadminAuthService } from './services/Admin/loginadmin-auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthgardGuard implements CanActivate {
  constructor(private _LoginadminAuthService:LoginadminAuthService, private _Router:Router){

  }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    {
   
      if(this._LoginadminAuthService.currentAdmin.getValue() != null)
      {
        return true;
      }
      else
      {
        (<any>this._Router).navigate(['/AdminLogin'])
        return false;
      }
   
  }
  
}
