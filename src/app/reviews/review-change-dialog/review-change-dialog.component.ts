import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ReviewItem } from '../../declarations';
import { MatSort, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ReviewsService } from '../../services/reviews.service';

@Component({
  selector: 'app-review-change-dialog',
  templateUrl: './review-change-dialog.component.html',
  styleUrls: ['./review-change-dialog.component.css']
})
export class ReviewChangeDialogComponent implements OnInit {

  form: FormGroup;

  review: ReviewItem;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private reviewsService: ReviewsService,
    public dialogRef: MatDialogRef<ReviewChangeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.review = data.review;
    }

  ngOnInit() {
    this.form = this.formBuilder.group({
        title: this.review.title,
        review: this.review.review
    });
  }

  updateReview() {
    this.review.title = this.form.value.title;
    this.review.review = this.form.value.review;
    this.reviewsService.updateReview(this.review).subscribe(resp => {
      this.dialogRef.close();
    },
    error => {
          this.router.navigate(['signin']);
    });
  }

}
