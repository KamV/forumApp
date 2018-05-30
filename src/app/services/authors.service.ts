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
      let count = 999999;
      let page = 1;
      return this.http.get<Author>(GlobalVariable.BASE_API_URL + 'api/authors?count=' + count + '&page=' + page, {
        withCredentials : true
      });
    }

    addAuthor(author: AuthorItem): Observable<AuthorItem> {
      return this.http.post<AuthorItem>(GlobalVariable.BASE_API_URL + 'api/authors', author, {
        withCredentials : true
      });
    }

    updateAuthor(author: AuthorItem): Observable<AuthorItem> {
      return this.http.put<AuthorItem>(GlobalVariable.BASE_API_URL + 'api/authors/' + author.id, author, {
        withCredentials : true
      });
    }
}
