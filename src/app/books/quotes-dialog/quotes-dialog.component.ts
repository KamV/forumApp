import { Component, OnInit, Inject } from '@angular/core';
import { Router } from "@angular/router";
import { MatSort, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { QuotesService } from '../../services/quotes.service';
import { Book, Quote } from '../../declarations';

@Component({
  selector: 'app-quotes-dialog',
  templateUrl: './quotes-dialog.component.html',
  styleUrls: ['./quotes-dialog.component.css']
})
export class QuotesDialogComponent implements OnInit {

  dataSource: any;

  displayedColumns = ['author', 'book', 'body', 'addOrDeleteFromFavouritesQuotesButton'];

  book: Book;

  quotes: Quote[];

  constructor(private quotesService: QuotesService,
    private router: Router,
    public dialogRef: MatDialogRef<QuotesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.book = data.book;

      this.quotesService.getBookQuotes(this.book).subscribe(resp => {
        this.quotes = resp;
        this.dataSource = new MatTableDataSource(this.quotes);
      },
      error => {
            this.router.navigate(['signin']);
      });

  }

  ngOnInit() {
  }

  onButtonClick() {
    this.dialogRef.close();
  }

  showAction(quote: Quote) {
    return !quote.isFavourite ? 'Добавить в избранное' : 'Убрать из избранного';
  }

  addOrDeleteFromFavouritesQuotes(quote: Quote) {
    let item = {
      id: quote.id,
      add: !quote.isFavourite
    };

    this.quotesService.addOrDeleteFromFavouritesQuotes(item).subscribe(resp => {
      this.quotes[this.quotes.indexOf(quote)].isFavourite = !quote.isFavourite;
      this.dataSource = new MatTableDataSource(this.quotes);
    },
    error => {
          this.router.navigate(['signin']);
    });
  }

}
