import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GlobalVariable } from '../global';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Book, Books } from '../declarations';

@Injectable()
export class BooksService {

    constructor(private http: HttpClient) {

    }

    getAll(): Observable<Books> {
      return this.http.get<Books>(GlobalVariable.BASE_API_URL + 'api/books?sortBy=id', {
        withCredentials : true
      });
    }

    addBook(book: Book): Observable<Book> {
      return this.http.post<Book>(GlobalVariable.BASE_API_URL + 'api/books', book, {
        withCredentials : true
      });
    }

    updateBook(book: Book): Observable<Book> {
      return this.http.put<Book>(GlobalVariable.BASE_API_URL + 'api/books/' + book.id, book, {
        withCredentials : true
      });
    }

    getFavouritesBooks(): Observable<Book[]> {
      return this.http.get<Book[]>(GlobalVariable.BASE_API_URL + 'api/favourites/books', {
        withCredentials : true
      });
    }

    addOrDeleteFromFavouritesBooks(item: any):Observable<any> {
      return this.http.put<any>(GlobalVariable.BASE_API_URL + 'api/favourites/books', item, {
        withCredentials : true
      });
    }
}
