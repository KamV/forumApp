import { Component, OnInit } from '@angular/core';
import { AdminAuthorsService } from '../services/admin.authors.service';
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
    private adminAuthorsService: AdminAuthorsService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
        name: '',
        description: '',
        birthday: ''
    });

    this.adminAuthorsService.getAll().subscribe(resp => {
      console.log('resp', resp);
    });

    this.dataSource = new MatTableDataSource(this.adminAuthorsService.getAllTest());
  }

  addAuthor() {
    this.adminAuthorsService.addAuthor(this.form.value).subscribe(resp => {
      console.log('resp', resp);
    });
  }

  updateAuthor(author: any) {
    this.adminAuthorsService.updateAuthor(author);
  }

}
