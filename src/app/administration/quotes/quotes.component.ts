import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthorsService } from '../../services/authors.service';
import { BooksService } from '../../services/books.service';
import { QuotesService } from '../../services/quotes.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { AuthService } from '../../services/auth.service';
import { Quote } from '../../declarations';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {

  form: FormGroup;

  dataSource;

  books: any;
  authors: any;
  quotes: Quote[];

  searchValues: any;
  selectedParamValue: string;
  selectedSearchValue: any;

  displayedColumns = ['body', 'updateButton', 'deleteButton'];

  showAdminMenu = false;

  constructor(private formBuilder: FormBuilder,
    private authorsService: AuthorsService,
    private booksService: BooksService,
    private quotesService: QuotesService,
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
      book: '',
      body: '',
      author: ''
    });

    this.booksService.getAll().subscribe(resp => {
      this.books = resp.books;
    },
    error => {
          this.router.navigate(['signin']);
    });

    this.authorsService.getAll().subscribe(resp => {
      this.authors = resp.authors;
    },
    error => {
          this.router.navigate(['signin']);
    });
  }

  addQuote() {
    this.form.value.author = this.form.value.book.author;
    this.quotesService.addQuote(this.form.value).subscribe(resp => {
      this.form.reset();
    },
    error => {
          this.router.navigate(['signin']);
    });
  }

  changeSelectedValue(value: string) {
    if (value == 'Автор') {
      this.searchValues = this.authors;
    } else {
      this.searchValues = this.books;
    }
  }

  getQuotes() {
    if (this.selectedParamValue == 'Автор') {
      this.quotesService.getAuthorQuotes(this.selectedSearchValue).subscribe(resp => {
        this.quotes = resp;
        this.dataSource = new MatTableDataSource(this.quotes);
      },
      error => {
            this.router.navigate(['signin']);
      });
    } else {
      this.quotesService.getBookQuotes(this.selectedSearchValue).subscribe(resp => {
        this.quotes = resp;
        this.dataSource = new MatTableDataSource(this.quotes);
      },
      error => {
            this.router.navigate(['signin']);
      });
    }

  }

  updateQuote(quote: Quote) {
    this.quotesService.updateQuote(quote).subscribe(resp => {
      console.log(resp);
    },
    error => {
          this.router.navigate(['signin']);
    });
  }

  deleteQuote(quote: Quote) {
    this.quotesService.deleteQuote(quote).subscribe(resp => {
      this.quotes.splice(this.quotes.indexOf(resp), 1);
      this.dataSource = new MatTableDataSource(this.quotes);
    },
    error => {
          this.router.navigate(['signin']);
    });
  }

  logout() {
    this.authService.logout();
  }

}
