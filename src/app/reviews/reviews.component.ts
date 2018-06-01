import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { AuthService } from '../services/auth.service';
import { ReviewsService } from '../services/reviews.service';
import { ReviewItem } from '../declarations';
import { ReviewChangeDialogComponent } from './review-change-dialog/review-change-dialog.component';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  form: FormGroup;

  showAdminMenu = false;

  reviews: ReviewItem[] = [];

  private id: number;
  private subscription: Subscription;

  currentUser: any;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private reviewsService: ReviewsService,
    public dialog: MatDialog,
    private router: Router,
    private activateRoute: ActivatedRoute) {
    this.subscription = activateRoute.params.subscribe(params=>this.id=params['id']);
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (this.currentUser && this.currentUser.role == 'ADMIN') {
      this.showAdminMenu = true;
    } else {
      this.showAdminMenu = false;
    }

    this.form = this.formBuilder.group({
        title: '',
        review: ''
    });

    this.reviewsService.getReviews(this.id).subscribe(resp => {
      this.reviews = resp.reviews;
    },
    error => {
          this.router.navigate(['signin']);
    });
  }

  openDialog(review: ReviewItem) {
    let dialogRef = this.dialog.open(ReviewChangeDialogComponent, {
      width: '600px',
      height: 'auto',
      data: { review: review }
    });

  }

  addReview() {
    this.reviewsService.addReview(this.form.value, this.id).subscribe(resp => {
      this.reviews.push(resp);

      this.form.reset();
    },
    error => {
          this.router.navigate(['signin']);
    });
  }

  deleteReview(review: ReviewItem) {
    this.reviewsService.deleteReview(review.id).subscribe(resp => {
      this.reviews.splice(this.reviews.indexOf(resp), 1);
    },
    error => {
          this.router.navigate(['signin']);
    });

  }

  logout() {
    this.authService.logout();
  }

}
