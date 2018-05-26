import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GlobalVariable } from '../global';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

@Injectable()
export class QuotesService {

    constructor(private http: HttpClient) {

    }

    // getAll(): Observable<any> {
    //   const req = new HttpRequest('GET', GlobalVariable.BASE_API_URL + 'api/authors', {
    //     withCredentials : true
    //   });
    //
    //   return this.http.request(req);
    // }
    //
    getAuthorQuotesTest(author: any) {
      return [
        {
          author: {
            id: 4,
            name: 'Шолохов',
            description: 'Писатель',
            birthday: new Date('12.12.1212')
          },
          book: {
            id: 1,
            isbn: 'Хз что здесь',
            name: 'Тихий Дон',
            viewedCount: 1,
            author: {
              id: 4,
              name: 'Шолохов',
              description: 'Писатель',
              birthday: new Date('12.12.1212')
            },
            genres: [
              {
                id: 1,
                name: 'Роман'
              }
            ],
            date: new Date('2018-05-26'),
            description: 'Какое-то описание'
          },
          body: 'Цитаты великих людей',
          id: 0
        }
      ];
    }

    getBookQuotesTest(book: any) {
      return [
        {
          author: {
            id: 4,
            name: 'Шолохов',
            description: 'Писатель',
            birthday: new Date('12.12.1212')
          },
          book: {
            id: 1,
            isbn: 'Хз что здесь',
            name: 'Тихий Дон',
            viewedCount: 1,
            author: {
              id: 4,
              name: 'Шолохов',
              description: 'Писатель',
              birthday: new Date('12.12.1212')
            },
            genres: [
              {
                id: 1,
                name: 'Роман'
              }
            ],
            date: new Date('2018-05-26'),
            description: 'Какое-то описание'
          },
          body: 'Цитаты отличные',
          id: 0
        }
      ];
    }

    addQuote(quote: any): Observable<any> {
      console.log(quote);
      const req = new HttpRequest('POST', GlobalVariable.BASE_API_URL + 'api/quotes', quote, {
        withCredentials : true
      });

      return this.http.request(req);
    }

    updateQuote(quote: any) {
      console.log(quote);
    }

    deleteQuote(quote: any) {
      console.log(quote);
    }
}
