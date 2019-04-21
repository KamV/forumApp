import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GlobalVariable } from '../global';
import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { StockItem } from '../declarations';

@Injectable()
export class StockService {

    constructor(
      private http: HttpClient,
      private router: Router,
      private _cookieService: CookieService) {

    }

    getAll(): Observable<StockItem[]> {
      let user = JSON.parse(localStorage.getItem('currentUser'));
      return this.http.get<StockItem[]>(
        GlobalVariable.BASE_API_URL + 'stock/items');
    }

    addItem(item): Observable<StockItem[]> {
      let user = JSON.parse(localStorage.getItem('currentUser'));
      return this.http.post<StockItem[]>(
        GlobalVariable.BASE_API_URL + 'stock/add',
        JSON.stringify({stockItem: item}),
        {
          headers: new HttpHeaders().append('Content-Type', 'application/json')
        }
      );
    }

    updateItem(item): Observable<StockItem[]> {
      let user = JSON.parse(localStorage.getItem('currentUser'));
      return this.http.post<StockItem[]>(
        GlobalVariable.BASE_API_URL + 'stock/update',
        JSON.stringify({stockItem: item}),
        {
          headers: new HttpHeaders().append('Content-Type', 'application/json')
        }
      );
    }

    deleteItem(id): Observable<StockItem[]> {
      let user = JSON.parse(localStorage.getItem('currentUser'));
      return this.http.post<StockItem[]>(
        GlobalVariable.BASE_API_URL + 'stock/delete',
        JSON.stringify({id: id}),
        {
          headers: new HttpHeaders().append('Content-Type', 'application/json')
        }
      );
    }
}
