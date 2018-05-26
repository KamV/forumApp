import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GlobalVariable } from '../global';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

@Injectable()
export class GenresService {

    constructor(private http: HttpClient) {

    }

    getAll(): Observable<any> {
      const req = new HttpRequest('GET', GlobalVariable.BASE_API_URL + 'api/genres', {
        withCredentials : true
      });

      return this.http.request(req);
    }

    getAllTest() {
      return [
        {
          id: 0,
          name: 'Политический'
        },
        {
          id: 1,
          name: 'Роман'
        },
        {
          id: 2,
          name: 'Детектив'
        }
      ];
    }

    addGenre(genre: any): Observable<any> {
      console.log(genre);
      const req = new HttpRequest('POST', GlobalVariable.BASE_API_URL + 'api/genres', genre, {
        withCredentials : true
      });

      return this.http.request(req);
    }

    updateGenre(genre: any) {
      console.log(genre);
    }

    deleteGenre(genre: any) {
      console.log(genre);
    }
}
