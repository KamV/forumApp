import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GlobalVariable } from '../global';
import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { User } from '../declarations';

@Injectable()
export class AuthService {

    constructor(
      private http: HttpClient,
      private router: Router,
      private _cookieService: CookieService) {

    }

    signIn(login: string, password: string): Observable<any> {
      return this.http.post<any>(GlobalVariable.BASE_API_URL + 'api/sign-in', {}, {
        headers: new HttpHeaders().append('login', login).append('password', password),
        withCredentials : true
      });
    }

    signUp(user: any): Observable<User> {
      return this.http.post<User>(GlobalVariable.BASE_API_URL + 'api/sign-up', user, {
        withCredentials : true
      });
    }

    getMe(): Observable<User> {
      return this.http.get<User>(GlobalVariable.BASE_API_URL + 'api/users/me', {
        withCredentials : true
      });
    }

    logout(): void {
      this._cookieService.remove('JSESSIONID');
      localStorage.clear();
      console.log(JSON.parse(localStorage.getItem('currentUser')));
      this.router.navigate(['signin']);
    }
}
