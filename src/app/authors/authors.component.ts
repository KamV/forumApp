import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthorsService } from '../services/authors.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { AuthService } from '../services/auth.service';
import { AuthorItem } from '../declarations';
import { AboutAuthorDialogComponent } from './about-author-dialog/about-author-dialog.component';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {

  form: FormGroup;

  dataSource;

  displayedColumns = ['name'];

  showAdminMenu = false;

  authors: AuthorItem[];

  @ViewChild(MatSort) sort: MatSort;

  constructor(private formBuilder: FormBuilder,
    private authorsService: AuthorsService,
    private authService: AuthService,
    public dialog: MatDialog) { }

  ngOnInit() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser && currentUser.role == 'ADMIN') {
      this.showAdminMenu = true;
    } else {
      this.showAdminMenu = false;
    }

    this.form = this.formBuilder.group({
        name: ''
    });

    this.authorsService.getAll().subscribe(resp => {
      this.authors = resp.authors;
      this.dataSource = new MatTableDataSource(this.authors);
    });

    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  openDialog(author: AuthorItem) {
    let dialogRef = this.dialog.open(AboutAuthorDialogComponent, {
      width: 'auto',
      height: 'auto',
      data: { author: author }
    });

  }

  logout() {
    this.authService.logout();
  }

}
