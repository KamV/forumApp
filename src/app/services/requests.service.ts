import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GlobalVariable } from '../global';
import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Request } from '../declarations';

@Injectable()
export class RequestsService {

    constructor(
      private http: HttpClient,
      private router: Router,
      private _cookieService: CookieService) {

    }

    getAll(): Observable<Request[]> {
      let user = JSON.parse(localStorage.getItem('currentUser'));
      return this.http.get<Request[]>(
        GlobalVariable.BASE_API_URL + 'requests');
    }

    getRequests(id): Observable<Request[]> {
      let user = JSON.parse(localStorage.getItem('currentUser'));
      return this.http.post<Request[]>(
        GlobalVariable.BASE_API_URL + 'requests',
        JSON.stringify({authorId: id}),
        {
          headers: new HttpHeaders().append('Content-Type', 'application/json')
        }
      );
    }

    addRequests(id, request): Observable<Request[]> {
      let user = JSON.parse(localStorage.getItem('currentUser'));
      return this.http.post<Request[]>(
        GlobalVariable.BASE_API_URL + 'requests/add',
        JSON.stringify({
          authorId: id,
          request: request
        }),
        {
          headers: new HttpHeaders().append('Content-Type', 'application/json')
        }
      );
    }

    deleteRequests(id, authorId, name, value, status): Observable<Request[]> {
      let user = JSON.parse(localStorage.getItem('currentUser'));
      return this.http.post<Request[]>(
        GlobalVariable.BASE_API_URL + 'requests/delete',
        JSON.stringify({
          id: id,
          authorId: authorId,
          name: name,
          value: value,
          status: status
        }),
        {
          headers: new HttpHeaders().append('Content-Type', 'application/json')
        }
      );
    }

    updateRequestStatus(id, status, name, value): Observable<any> {
      let user = JSON.parse(localStorage.getItem('currentUser'));
      return this.http.post<any>(
        GlobalVariable.BASE_API_URL + 'requests/update-status',
        JSON.stringify({
          id: id,
          status: status,
          name: name,
          value: value
        }),
        {
          headers: new HttpHeaders().append('Content-Type', 'application/json')
        }
      );
    }
}
