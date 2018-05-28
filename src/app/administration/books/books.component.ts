import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSort, MatTableDataSource } from '@angular/material';
import { GenresService } from '../../services/genres.service';
import { AuthorsService } from '../../services/authors.service';
import { BooksService } from '../../services/books.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  form: FormGroup;

  dataSource = new MatTableDataSource(this.booksService.getBooksTest());

  authors: any;
  genres: any;

  displayedColumns = ['author', 'date', 'description', 'genre', 'name', 'updateButton'];

  showAdminMenu = false;

  constructor(private formBuilder: FormBuilder,
    private authorsService: AuthorsService,
    private booksService: BooksService,
    private genresService: GenresService,
    private authService: AuthService) { }

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
        genre: '',
        name: ''
    });

    // this.dataSource = new MatTableDataSource(this.booksService.getBooksTest());

    this.dataSource.sort = this.sort;

    this.authorsService.getAll().subscribe(resp => {
      this.authors = resp.authors;
    });

    this.genresService.getAll().subscribe(resp => {
      this.genres = resp;
    });
  }

  compareById(item1, item2) {
    return item1.id === item2.id;
  }

  addBook() {
    this.booksService.addBook(this.form.value).subscribe(resp => {
      console.log('resp', resp);
    });
  }

  updateBook(book: any) {
    this.booksService.updateBook(book);
  }

  logout() {
    this.authService.logout();
  }

}
