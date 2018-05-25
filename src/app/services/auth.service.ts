import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GlobalVariable } from '../global';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class AuthService {

    constructor(private http: HttpClient) {

    }

    signIn(login: string, password: string): Observable<any> {
      return this.http.post<any>(GlobalVariable.BASE_API_URL + 'api/sign-in', {}, {
        headers: new HttpHeaders().append('login', login).append('password', password),
        withCredentials : true
      });
    }

    signUp(user: any): Observable<any> {
      return this.http.post<any>(GlobalVariable.BASE_API_URL + 'api/sign-up', user, {
        withCredentials : true
      });
    }

    signout(): void {

    }
}
