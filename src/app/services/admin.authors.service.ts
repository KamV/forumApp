import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GlobalVariable } from '../global';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

@Injectable()
export class AdminAuthorsService {

    constructor(private http: HttpClient) {

    }

    getAll(): Observable<any> {
      const req = new HttpRequest('GET', GlobalVariable.BASE_API_URL + 'api/authors', {
        withCredentials : true
      });

      return this.http.request(req);
      // return this.http.post<any>(GlobalVariable.BASE_API_URL + 'api/authors', { withCredentials : true });
    }
}
