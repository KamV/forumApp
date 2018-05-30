import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSort, MatTableDataSource } from '@angular/material';
import { GenresService } from '../../services/genres.service';
import { AuthorsService } from '../../services/authors.service';
import { BooksService } from '../../services/books.service';
import { AuthService } from '../../services/auth.service';
import { AuthorItem, Genre, Book } from '../../declarations';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class AdminBooksComponent implements OnInit {

  form: FormGroup;

  dataSource: any;

  authors: AuthorItem[];
  genres: Genre[];
  books: Book[] = [];

  displayedColumns = ['author', 'date', 'description', 'genre', 'name', 'isbn', 'updateButton'];

  showAdminMenu = false;

  constructor(private formBuilder: FormBuilder,
    private authorsService: AuthorsService,
    private booksService: BooksService,
    private genresService: GenresService,
    private authService: AuthService,
    private router: Router) { }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser && currentUser.role == 'ADMIN') {
      this.showAdminMenu = true;
    } else {
      this.showAdminMenu = false;
    }

    this.form = this.formBuilder.group({
        author: '',
        date: '',
        description: '',
        genres: '',
        name: '',
        isbn: ''
    });

    this.authorsService.getAll().subscribe(resp => {
      this.authors = resp.authors;
    },
    error => {
          this.router.navigate(['signin']);
    });

    this.genresService.getAll().subscribe(resp => {
      this.genres = resp;
    },
    error => {
          this.router.navigate(['signin']);
    });

    this.booksService.getAll().subscribe(resp => {
      this.books = resp.books;
      this.dataSource = new MatTableDataSource(this.books);

      this.dataSource.sort = this.sort;
    },
    error => {
          this.router.navigate(['signin']);
    });
  }

  compareById(item1, item2) {
    return item1.id === item2.id;
  }

  addBook() {
    this.booksService.addBook(this.form.value).subscribe(resp => {
      this.books.push(resp);
      this.dataSource = new MatTableDataSource(this.books);

      this.form.reset();
    },
    error => {
          this.router.navigate(['signin']);
    });
  }

  updateBook(book: Book) {
    this.booksService.updateBook(book).subscribe(resp => {
      console.log(book);
    },
    error => {
          this.router.navigate(['signin']);
    });
  }

  logout() {
    this.authService.logout();
  }

}
