import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GlobalVariable } from '../global';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Themes, ThemeItem, Messages, MessageItem } from '../declarations';

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

    getMessages(themeId: number): Observable<Messages> {
      let count = 999999;
      let page = 1;
      return this.http.get<Messages>(GlobalVariable.BASE_API_URL + 'api/themes/' + themeId + '/messages?count=' + count + '&page=' + page, {
        withCredentials : true
      });
    }

    addMessage(message: MessageItem, themeId: number): Observable<MessageItem> {
      return this.http.post<MessageItem>(GlobalVariable.BASE_API_URL + 'api/themes/' + themeId + '/messages', message, {
        withCredentials : true
      });
    }

    deleteMessage(id: number): Observable<MessageItem> {
      return this.http.delete<MessageItem>(GlobalVariable.BASE_API_URL + 'api/messages/' + id, {
        withCredentials : true
      });
    }

    updateMessage(message: MessageItem): Observable<MessageItem> {
      return this.http.put<MessageItem>(GlobalVariable.BASE_API_URL + 'api/messages/' + message.messageId, message, {
        withCredentials : true
      });
    }

}
