import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginActivateGuard implements CanActivate {

    constructor(private router: Router ){

    }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): 
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        console.log('AuthGuard#canActivate called');
        if (sessionStorage.getItem("token")) {
            return true;
        }
        this.router.navigate([""]);
    return false;
  }
  
}
