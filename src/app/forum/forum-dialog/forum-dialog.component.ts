import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ThemeItem } from '../../declarations';
import { MatSort, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ForumService } from '../../services/forum.service';

@Component({
  selector: 'app-forum-dialog',
  templateUrl: './forum-dialog.component.html',
  styleUrls: ['./forum-dialog.component.css']
})
export class ForumDialogComponent implements OnInit {

  form: FormGroup;

  theme: ThemeItem;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private forumService: ForumService,
    public dialogRef: MatDialogRef<ForumDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.theme = data.theme;
    }

  ngOnInit() {
    this.form = this.formBuilder.group({
        title: this.theme.title
    });
  }

  updateTheme() {
    this.theme.title = this.form.value.title;
    this.forumService.updateTheme(this.theme).subscribe(resp => {
      this.dialogRef.close();
    },
    error => {
          this.router.navigate(['signin']);
    });
  }

}
