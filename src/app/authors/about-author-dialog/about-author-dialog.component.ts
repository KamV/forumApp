import { Component, OnInit, Inject } from '@angular/core';
import { MatSort, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthorItem } from '../../declarations';

@Component({
  selector: 'app-about-author-dialog',
  templateUrl: './about-author-dialog.component.html',
  styleUrls: ['./about-author-dialog.component.css']
})
export class AboutAuthorDialogComponent implements OnInit {

  dataSource;

  displayedColumns = ['name', 'description', 'birthday'];

  authors: AuthorItem[] = [];

  constructor(public dialogRef: MatDialogRef<AboutAuthorDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any) {
    this.authors.push(data.author);
    this.dataSource = new MatTableDataSource(this.authors);
  }

  ngOnInit() {
  }

  onButtonClick() {
    this.dialogRef.close();
  }

}
