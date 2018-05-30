import { Component, OnInit } from '@angular/core';
import { MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { BooksService } from '../services/books.service';
import { AuthService } from '../services/auth.service';
import { Book } from '../declarations';
import { QuotesDialogComponent } from './quotes-dialog/quotes-dialog.component';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  dataSource: any;

  displayedColumns = ['author', 'date', 'description', 'genre', 'name', 'showQuotes'];

  showAdminMenu = false;

  books: Book[];

  constructor(private booksService: BooksService,
    private authService: AuthService,
    public dialog: MatDialog) { }

  ngOnInit() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser && currentUser.role == 'ADMIN') {
      this.showAdminMenu = true;
    } else {
      this.showAdminMenu = false;
    }

    // this.books = this.booksService.getBooksTest();
    // this.dataSource = new MatTableDataSource(this.books);
    // this.booksService.getAll().subscribe(resp => {
    //   this.books = resp;
    //   this.dataBooksSource = new MatTableDataSource(this.books);
    // });
  }
  //
  // applyFilter(filterValue: string) {
  //   // filterValue = filterValue.trim();
  //   // filterValue = filterValue.toLowerCase();
  //   // this.dataSource.filter = filterValue;
  // }
  //
  // openDialog(book: Book) {
  //   let dialogRef = this.dialog.open(QuotesDialogComponent, {
  //     width: 'auto',
  //     height: 'auto',
  //     data: { book: book }
  //   });
  //
  // }
  //
  // addOrDeleteFromFavouritesBooks(book: Book) {
  //   let item = {
  //     bookId: book.id,
  //     add: true
  //   };
  //
  //   this.booksService.addOrDeleteFromFavouritesBooks(item).subscribe(resp => {
  //     console.log(resp);
  //   });
  // }
  //
  // logout() {
  //   this.authService.logout();
  // }

}
