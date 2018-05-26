import { Component, OnInit } from '@angular/core';
import { AuthorsService } from '../services/authors.service';
import { BooksService } from '../services/books.service';
import { QuotesService } from '../services/quotes.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';

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
  searchValues: any;
  selectedParamValue: string;
  selectedSearchValue: any;

  displayedColumns = ['body', 'updateButton', 'deleteButton'];

  constructor(private formBuilder: FormBuilder,
    private authorsService: AuthorsService,
    private booksService: BooksService,
    private quotesService: QuotesService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      book: '',
      body: ''
    });

    this.books = this.booksService.getBooksTest();

    this.authors = this.authorsService.getAllTest();
  }

  addQuote() {
    let quote;
    for (var key in this.books)  {
      if (this.form.value.book == this.books[key]) {
        quote = this.books[key];
      }
    }
    quote['body'] = this.form.value.body;
    this.quotesService.addQuote(quote).subscribe(resp => {
      console.log('resp', resp);
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
      this.getAuthorQuotes(this.selectedSearchValue);
    } else {
      this.getBookQuotes(this.selectedSearchValue);
    }

  }

  getAuthorQuotes(value: any) {
    this.dataSource = new MatTableDataSource(this.quotesService.getAuthorQuotesTest(value));
  }

  getBookQuotes(value: any) {
    this.dataSource = new MatTableDataSource(this.quotesService.getBookQuotesTest(value));
  }

  updateQuote(quote: any) {
    this.quotesService.updateQuote(quote);
  }

  deleteQuote(quote: any) {
    this.quotesService.deleteQuote(quote);
  }

}
