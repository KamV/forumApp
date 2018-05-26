import { Component, OnInit } from '@angular/core';
import { AuthorsService } from '../services/authors.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {

  form: FormGroup;

  dataSource;

  displayedColumns = ['name', 'description', 'birthday', 'updateButton'];

  constructor(private formBuilder: FormBuilder,
    private authorsService: AuthorsService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
        name: '',
        description: '',
        birthday: ''
    });

    this.authorsService.getAll().subscribe(resp => {
      console.log('resp', resp);
    });

    this.dataSource = new MatTableDataSource(this.authorsService.getAllTest());
  }

  addAuthor() {
    this.authorsService.addAuthor(this.form.value).subscribe(resp => {
      console.log('resp', resp);
    });
  }

  updateAuthor(author: any) {
    this.authorsService.updateAuthor(author);
  }

}
