import { Component, OnInit, Inject } from '@angular/core';
import { MatSort, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { QuotesService } from '../../services/quotes.service';
import { Book, Quote } from '../../declarations';

@Component({
  selector: 'app-quotes-dialog',
  templateUrl: './quotes-dialog.component.html',
  styleUrls: ['./quotes-dialog.component.css']
})
export class QuotesDialogComponent implements OnInit {

  dataSource;

  displayedColumns = ['author', 'book', 'body', 'addOrDeleteFromFavouritesQuotesButton'];

  book: Book;

  quotes: Quote[];

  constructor(private quotesService: QuotesService,
    public dialogRef: MatDialogRef<QuotesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    // this.book = data.book;
    //
    // this.quotes = getBookQuotesTest();
    // this.dataSource = new MatTableDataSource(this.quotes);
    // this.quotesService.getBookQuotes(book.id).subscribe(resp => {
    //   this.quotes = resp;
    //   this.dataSource = new MatTableDataSource(this.quotes);
    // });

  }

  ngOnInit() {
  }

  addOrDeleteFromFavouritesQuotes() {

  }

  onButtonClick() {
    this.dialogRef.close();
  }

}
