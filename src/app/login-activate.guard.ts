import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './service/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginActivateGuard implements CanActivate {

    constructor(private usersService : UserService, private router: Router ){

    }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): 
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        console.log('AuthGuard#canActivate called');
        if (this.usersService.isLoggedIn()) {
            return true;
        }
        this.router.navigate([""]);
    return false;
  }
  
}
