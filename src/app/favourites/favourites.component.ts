import { Component, OnInit } from '@angular/core';
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
    private quotesService: QuotesService) { }

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
    });

    this.quotesService.getFavouritesQuotes().subscribe(resp => {
      this.quotes = resp;
      this.dataQuotesSource = new MatTableDataSource(this.quotes);
    });

  }

  deleteFromFavouritesBooks(book: Book) {
    let item = {
      bookId: book.id,
      add: false
    };

    this.booksService.addOrDeleteFromFavouritesBooks(item).subscribe(resp => {
      console.log(resp);
    });
  }

  deleteFromFavouritesQuotes(quote: Quote) {
    let item = {
      quoteId: quote.id,
      add: false
    };

    this.quotesService.addOrDeleteFromFavouritesQuotes(item).subscribe(resp => {
      console.log(resp);
    });
  }

  logout() {
    this.authService.logout();
  }

}
