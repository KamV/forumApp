import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageItem } from '../../declarations';
import { MatSort, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ForumService } from '../../services/forum.service';

@Component({
  selector: 'app-change-message-dialog',
  templateUrl: './change-message-dialog.component.html',
  styleUrls: ['./change-message-dialog.component.css']
})
export class ChangeMessageDialogComponent implements OnInit {

  form: FormGroup;

  message: MessageItem;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private forumService: ForumService,
    public dialogRef: MatDialogRef<ChangeMessageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.message = data.message;
    }

  ngOnInit() {
    this.form = this.formBuilder.group({
        body: this.message.body
    });

  }

  updateMessage() {
    this.message.body = this.form.value.body;
    this.forumService.updateMessage(this.message).subscribe(resp => {
      this.dialogRef.close();
    },
    error => {
          this.router.navigate(['signin']);
    });
  }

}
