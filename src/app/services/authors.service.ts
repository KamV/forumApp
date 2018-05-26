import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GlobalVariable } from '../global';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

@Injectable()
export class AuthorsService {

    constructor(private http: HttpClient) {

    }

    getAll(): Observable<any> {
      const req = new HttpRequest('GET', GlobalVariable.BASE_API_URL + 'api/authors', {
        withCredentials : true
      });

      return this.http.request(req);
    }

    getAllTest() {
      return [
        {
          id: 0,
          name: 'Пушкин',
          description: 'Писатель',
          birthday: new Date('12.12.1212')
        },
        {
          id: 1,
          name: 'Лермонотов',
          description: 'Писатель',
          birthday: new Date('12.12.1212')
        },
        {
          id: 2,
          name: 'Ремарк',
          description: 'Писатель',
          birthday: new Date('12.12.1212')
        },
        {
          id: 3,
          name: 'Толстой',
          description: 'Писатель',
          birthday: new Date('12.12.1212')
        },
        {
          id: 4,
          name: 'Шолохов',
          description: 'Писатель',
          birthday: new Date('12.12.1212')
        }
      ];
    }

    addAuthor(author: any): Observable<any> {
      console.log(author);
      const req = new HttpRequest('POST', GlobalVariable.BASE_API_URL + 'api/authors', author, {
        withCredentials : true
      });

      return this.http.request(req);
    }

    updateAuthor(author: any) {
      console.log(author);
    }
}
