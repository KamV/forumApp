import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GlobalVariable } from '../global';
import { HttpClient, HttpHeaders, HttpRequest, HttpParams } from '@angular/common/http';
import { Author, AuthorItem } from '../declarations';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  withCredentials : true
};

@Injectable()
export class AuthorsService {

    constructor(private http: HttpClient) {

    }

    getAll(): Observable<Author> {
      return this.http.get<Author>(GlobalVariable.BASE_API_URL + 'api/authors', {
        withCredentials : true
      });
    }

    addAuthor(author: AuthorItem): Observable<AuthorItem> {
      // console.log(author);
      // const body = JSON.stringify({birthday: '2018-05-27', description: 'Писатель', name: 'Васильев'});
      // let item = {
      //   birthday: "2018-05-27",
      //   description: "Писатель",
      //   name: "Васильев"
      // };
      // const req = new HttpRequest('POST', GlobalVariable.BASE_API_URL + 'api/authors', body, httpOptions);
      //
      // return this.http.request(req);

      const body = new HttpParams().set('birthday', '2018-05-27');

      return this.http.post<AuthorItem>(GlobalVariable.BASE_API_URL + 'api/authors', author, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        withCredentials : true
      });
    }

    updateAuthor(author: AuthorItem): Observable<AuthorItem> {
      // const req = new HttpRequest('PUT', GlobalVariable.BASE_API_URL + 'api/authors/4', JSON.stringify(author), {
      //   withCredentials : true
      // });
      //
      // return this.http.request(req);
      return this.http.put<AuthorItem>(GlobalVariable.BASE_API_URL + 'api/authors/4', author, {
        withCredentials : true
      });
    }
}
