import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GlobalVariable } from '../global';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Genre } from '../declarations';

@Injectable()
export class GenresService {

    constructor(private http: HttpClient) {

    }

    getAll(): Observable<Genre[]> {
      return this.http.get<Genre[]>(GlobalVariable.BASE_API_URL + 'api/genres', {
        withCredentials : true
      });
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
