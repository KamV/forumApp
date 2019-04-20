import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GlobalVariable } from '../global';
import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Material } from '../declarations';

@Injectable()
export class MaterialsService {

    constructor(
      private http: HttpClient,
      private router: Router,
      private _cookieService: CookieService) {

    }

    getMaterials(): Observable<Material[]> {
      let user = JSON.parse(localStorage.getItem('currentUser'));
      return this.http.get<Material[]>(GlobalVariable.BASE_API_URL + 'materials');
    }

    addMaterial(name, articule): Observable<Material[]> {
      let user = JSON.parse(localStorage.getItem('currentUser'));
      return this.http.post<Material[]>(
        GlobalVariable.BASE_API_URL + 'materials/add',
        JSON.stringify({
          name: name,
          articule: articule
        }),
        {
          headers: new HttpHeaders().append('Content-Type', 'application/json')
        }
      );
    }

    updateMaterial(material): Observable<Material[]> {
      let user = JSON.parse(localStorage.getItem('currentUser'));
      return this.http.post<Material[]>(
        GlobalVariable.BASE_API_URL + 'materials/update',
        JSON.stringify(material),
        {
          headers: new HttpHeaders().append('Content-Type', 'application/json')
        }
      );
    }
}
