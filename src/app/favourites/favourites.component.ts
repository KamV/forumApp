import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MatSort, MatTableDataSource } from '@angular/material';
import { BooksService } from '../services/books.service';
import { AuthService } from '../services/auth.service';
import { QuotesService } from '../services/quotes.service';
import { Book, Quote } from '../declarations';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  dataBooksSource: any;

  dataQuotesSource: any;

  displayedBookColumns = ['author', 'date', 'description', 'genre', 'name', 'deleteFromFavouritesBooksButton'];

  displayedQuoteColumns = ['author', 'book', 'body', 'deleteFromFavouritesQuotesButton'];

  showAdminMenu = false;

  books: Book[];

  quotes: Quote[];

  constructor(private booksService: BooksService,
    private authService: AuthService,
    private quotesService: QuotesService,
    private router: Router) { }

  ngOnInit() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser && currentUser.role == 'ADMIN') {
      this.showAdminMenu = true;
    } else {
      this.showAdminMenu = false;
    }

    this.booksService.getFavouritesBooks().subscribe(resp => {
      this.books = resp;
      this.dataBooksSource = new MatTableDataSource(this.books);
    },
    error => {
          this.router.navigate(['signin']);
    });

    this.quotesService.getFavouritesQuotes().subscribe(resp => {
      this.quotes = resp;
      this.dataQuotesSource = new MatTableDataSource(this.quotes);
    },
    error => {
          this.router.navigate(['signin']);
    });

  }

  deleteFromFavouritesBooks(book: Book) {
    let item = {
      id: book.id,
      add: false
    };

    this.booksService.addOrDeleteFromFavouritesBooks(item).subscribe(resp => {
      this.books.splice(this.books.indexOf(book), 1);
      this.dataBooksSource = new MatTableDataSource(this.books);
    },
    error => {
          this.router.navigate(['signin']);
    });
  }

  deleteFromFavouritesQuotes(quote: Quote) {
    let item = {
      id: quote.id,
      add: false
    };

    this.quotesService.addOrDeleteFromFavouritesQuotes(item).subscribe(resp => {
      this.quotes.splice(this.quotes.indexOf(quote), 1);
      this.dataQuotesSource = new MatTableDataSource(this.quotes);
    },
    error => {
          this.router.navigate(['signin']);
    });
  }

  logout() {
    this.authService.logout();
  }

}
