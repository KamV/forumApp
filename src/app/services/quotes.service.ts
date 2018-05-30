import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GlobalVariable } from '../global';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Quote, AuthorItem, Book } from '../declarations';

@Injectable()
export class QuotesService {

    constructor(private http: HttpClient) {

    }

    getAuthorQuotes(author: AuthorItem): Observable<Quote[]> {
      return this.http.get<Quote[]>(GlobalVariable.BASE_API_URL + 'api/authors/'+ author.id +'/quotes', {
        withCredentials : true
      });
    }

    getBookQuotes(book: Book): Observable<Quote[]> {
      return this.http.get<Quote[]>(GlobalVariable.BASE_API_URL + 'api/books/'+ book.id +'/quotes', {
        withCredentials : true
      });
    }

    addQuote(quote: Quote): Observable<Quote> {
      return this.http.post<Quote>(GlobalVariable.BASE_API_URL + 'api/books/' + quote.book.id  + '/quotes', quote, {
        withCredentials : true
      });
    }

    updateQuote(quote: Quote): Observable<Quote> {
      return this.http.put<Quote>(GlobalVariable.BASE_API_URL + 'api/quotes/' + quote.id, quote, {
        withCredentials : true
      });
    }

    getFavouritesQuotes(): Observable<Quote[]> {
      return this.http.get<Quote[]>(GlobalVariable.BASE_API_URL + 'api/favourites/quotes', {
        withCredentials : true
      });
    }

    addOrDeleteFromFavouritesQuotes(item: any):Observable<any> {
      return this.http.put<any>(GlobalVariable.BASE_API_URL + 'api/favourites/quotes', item, {
        withCredentials : true
      });
    }

    deleteQuote(quote: Quote): Observable<Quote> {
      return this.http.delete<Quote>(GlobalVariable.BASE_API_URL + 'api/quotes/' + quote.id, {
        withCredentials : true
      });
    }
}
