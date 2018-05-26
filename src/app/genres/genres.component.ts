import { Component, OnInit } from '@angular/core';
import { GenresService } from '../services/genres.service';
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
    private genresService: GenresService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
        name: ''
    });

    this.genresService.getAll().subscribe(resp => {
      console.log('resp', resp);
    });

    this.dataSource = new MatTableDataSource(this.genresService.getAllTest());
  }

  addGenre() {
    this.genresService.addGenre(this.form.value).subscribe(resp => {
      console.log('resp', resp);
    });
  }

  updateGenre(genre: any) {
    this.genresService.updateGenre(genre);
  }

  deleteGenre(genre: any) {
    this.genresService.deleteGenre(genre);
  }

}
