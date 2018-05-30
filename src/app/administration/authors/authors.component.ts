import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthorsService } from '../../services/authors.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { AuthService } from '../../services/auth.service';
import { AuthorItem } from '../../declarations';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AdminAuthorsComponent implements OnInit {

  form: FormGroup;

  dataSource;

  displayedColumns = ['name', 'description', 'birthday', 'updateButton'];

  showAdminMenu = false;

  authors: AuthorItem[];

  constructor(private formBuilder: FormBuilder,
    private authorsService: AuthorsService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser && currentUser.role == 'ADMIN') {
      this.showAdminMenu = true;
    } else {
      this.showAdminMenu = false;
    }

    this.form = this.formBuilder.group({
        name: '',
        description: '',
        birthday: ''
    });

    this.authorsService.getAll().subscribe(resp => {
      this.authors = resp.authors;
      this.dataSource = new MatTableDataSource(this.authors);
    },
    error => {
          this.router.navigate(['signin']);
    });
  }

  addAuthor() {
    this.authorsService.addAuthor(this.form.value).subscribe(resp => {
      this.authors.push(resp);
      this.dataSource = new MatTableDataSource(this.authors);

      this.form.reset();
    },
    error => {
          this.router.navigate(['signin']);
    });
  }

  updateAuthor(author: any) {
    this.authorsService.updateAuthor(author).subscribe(resp => {
      console.log('resp', resp);
    },
    error => {
          this.router.navigate(['signin']);
    });

  }

  logout() {
    this.authService.logout();
  }

}
