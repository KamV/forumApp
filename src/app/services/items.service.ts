import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GlobalVariable } from '../global';
import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Item } from '../declarations';

@Injectable()
export class ItemsService {

    constructor(
      private http: HttpClient,
      private router: Router,
      private _cookieService: CookieService) {

    }

    getItems(): Observable<Item[]> {
      let user = JSON.parse(localStorage.getItem('currentUser'));
      return this.http.get<Item[]>(GlobalVariable.BASE_API_URL + 'items');
    }
}
