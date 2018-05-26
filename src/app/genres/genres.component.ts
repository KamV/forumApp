import { Component, OnInit } from '@angular/core';
import { AdminGenresService } from '../services/admin.genres.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {

  form: FormGroup;

  dataSource;

  displayedColumns = ['name', 'updateButton', 'deleteButton'];

  constructor(private formBuilder: FormBuilder,
    private adminGenresService: AdminGenresService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
        name: ''
    });

    this.adminGenresService.getAll().subscribe(resp => {
      console.log('resp', resp);
    });

    this.dataSource = new MatTableDataSource(this.adminGenresService.getAllTest());
  }

  addGenre() {
    this.adminGenresService.addGenre(this.form.value).subscribe(resp => {
      console.log('resp', resp);
    });
  }

  updateGenre(genre: any) {
    this.adminGenresService.updateGenre(genre);
  }

  deleteGenre(genre: any) {
    this.adminGenresService.deleteGenre(genre);
  }

}
