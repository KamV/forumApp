import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GlobalVariable } from '../global';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Themes, ThemeItem } from '../declarations';

@Injectable()
export class ForumService {

    constructor(private http: HttpClient) {

    }

    getThemes(): Observable<Themes> {
      let count = 999999;
      let page = 1;
      return this.http.get<Themes>(GlobalVariable.BASE_API_URL + 'api/themes?count=' + count + '&page=' + page, {
        withCredentials : true
      });
    }

    addTheme(theme: ThemeItem): Observable<ThemeItem> {
      return this.http.post<ThemeItem>(GlobalVariable.BASE_API_URL + 'api/themes', theme, {
        withCredentials : true
      });
    }

    deleteTheme(id: number): Observable<ThemeItem> {
      return this.http.delete<ThemeItem>(GlobalVariable.BASE_API_URL + 'api/themes/' + id, {
        withCredentials : true
      });
    }

    updateTheme(theme: ThemeItem): Observable<ThemeItem> {
      return this.http.put<ThemeItem>(GlobalVariable.BASE_API_URL + 'api/themes/' + theme.themeId, theme, {
        withCredentials : true
      });
    }

}
