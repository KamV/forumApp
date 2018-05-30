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

    addGenre(genre: Genre): Observable<Genre> {
      return this.http.post<Genre>(GlobalVariable.BASE_API_URL + 'api/genres', genre, {
        withCredentials : true
      });
    }

    updateGenre(genre: Genre): Observable<Genre>  {
      return this.http.put<Genre>(GlobalVariable.BASE_API_URL + 'api/genres/' + genre.id, genre, {
        withCredentials : true
      });
    }

    deleteGenre(genre: Genre) {
      return this.http.delete<Genre>(GlobalVariable.BASE_API_URL + 'api/genres/' + genre.id, {
        withCredentials : true
      });
    }
}
