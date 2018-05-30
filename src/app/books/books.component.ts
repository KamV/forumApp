import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
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

  displayedColumns = ['author', 'date', 'description', 'genre', 'name', 'showQuotes', 'addOrDeleteFromFavouritesBooksButton'];

  showAdminMenu = false;

  books: Book[];

  constructor(private booksService: BooksService,
    private authService: AuthService,
    public dialog: MatDialog,
    private router: Router) { }

  ngOnInit() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser && currentUser.role == 'ADMIN') {
      this.showAdminMenu = true;
    } else {
      this.showAdminMenu = false;
    }

    this.dataSource = new MatTableDataSource(this.books);
    this.booksService.getAll().subscribe(resp => {
      this.books = resp.books;
      this.dataSource = new MatTableDataSource(this.books);
    },
    error => {
          this.router.navigate(['signin']);
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  openDialog(book: Book) {
    let dialogRef = this.dialog.open(QuotesDialogComponent, {
      width: 'auto',
      height: 'auto',
      data: { book: book }
    });

  }

  showAction(book: Book) {
    return !book.isFavourite ? 'Добавить в избранное' : 'Убрать из избранного';
  }

  addOrDeleteFromFavouritesBooks(book: Book) {
    let item = {
      id: book.id,
      add: !book.isFavourite
    };

    this.booksService.addOrDeleteFromFavouritesBooks(item).subscribe(resp => {
      this.books[this.books.indexOf(book)].isFavourite = !book.isFavourite;
      this.dataSource = new MatTableDataSource(this.books);
    },
    error => {
          this.router.navigate(['signin']);
    });
  }

  logout() {
    this.authService.logout();
  }

}
