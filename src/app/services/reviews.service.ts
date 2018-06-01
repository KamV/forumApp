import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GlobalVariable } from '../global';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Reviews, ReviewItem } from '../declarations';

@Injectable()
export class ReviewsService {

    constructor(private http: HttpClient) {

    }

    getReviews(id: number): Observable<Reviews> {
      let count = 999999;
      let page = 1;
      return this.http.get<Reviews>(GlobalVariable.BASE_API_URL + 'api/books/' + id + '/reviews?sortBy=id&count=' + count + '&page=' + page, {
        withCredentials : true
      });
    }

    addReview(review: ReviewItem, id: number): Observable<ReviewItem> {
      return this.http.post<ReviewItem>(GlobalVariable.BASE_API_URL + 'api/books/' + id + '/reviews', review, {
        withCredentials : true
      });
    }

    deleteReview(id: number): Observable<ReviewItem> {
      return this.http.delete<ReviewItem>(GlobalVariable.BASE_API_URL + 'api/reviews/' + id, {
        withCredentials : true
      });
    }

    updateReview(review: ReviewItem): Observable<ReviewItem> {
      return this.http.put<ReviewItem>(GlobalVariable.BASE_API_URL + 'api/reviews/' + review.id, review, {
        withCredentials : true
      });
    }

}
