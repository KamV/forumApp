import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { GenresService } from '../services/genres.service';
import { AuthorsService } from '../services/authors.service';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  form: FormGroup;

  dataSource;

  authors: any;
  genres: any;

  displayedColumns = ['author', 'date', 'description', 'genre', 'name', 'updateButton'];

  constructor(private formBuilder: FormBuilder,
    private authorsService: AuthorsService,
    private booksService: BooksService,
    private genresService: GenresService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
        author: '',
        date: '',
        description: '',
        genre: '',
        name: ''
    });

    this.dataSource = new MatTableDataSource(this.booksService.getBooksTest());

    this.authors = this.authorsService.getAllTest();

    this.genres = this.genresService.getAllTest();
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

}
