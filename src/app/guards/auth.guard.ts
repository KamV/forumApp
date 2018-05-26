import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { CookieService } from 'angular2-cookie/services/cookies.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private _cookieService: CookieService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser) {
      return currentUser.isAuth;
    }

    this.router.navigate(['signin']);

    return false;
  }
}
