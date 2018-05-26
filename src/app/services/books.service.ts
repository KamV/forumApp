import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GlobalVariable } from '../global';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

@Injectable()
export class BooksService {

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
    getBooksTest() {
      return [
        {
          id: 0,
          isbn: 'Хз что здесь',
          name: 'Война и Мир',
          viewedCount: 1,
          author: {
            id: 3,
            name: 'Толстой',
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
        {
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
            },
            {
              id: 2,
              name: 'Детектив'
            }
          ],
          date: new Date('2018-05-26'),
          description: 'Какое-то описание'
        },
        {
          id: 2,
          isbn: 'Хз что здесь',
          name: 'Сказка о царе Салтане',
          viewedCount: 1,
          author: {
            id: 0,
            name: 'Пушкин',
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
        }
      ];
    }

    addBook(book: any): Observable<any> {
      console.log(book);
      const req = new HttpRequest('POST', GlobalVariable.BASE_API_URL + 'api/books', book, {
        withCredentials : true
      });

      return this.http.request(req);
    }

    updateBook(book: any) {
      console.log(book);
    }
}
