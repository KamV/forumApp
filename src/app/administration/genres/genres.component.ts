import { Component, OnInit } from '@angular/core';
import { GenresService } from '../../services/genres.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { AuthService } from '../../services/auth.service';
import { Genre } from '../../declarations';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {

  form: FormGroup;

  dataSource;

  displayedColumns = ['name', 'updateButton', 'deleteButton'];

  showAdminMenu = false;

  genres: Genre[];

  constructor(private formBuilder: FormBuilder,
    private genresService: GenresService,
    private authService: AuthService) { }

  ngOnInit() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser && currentUser.role == 'ADMIN') {
      this.showAdminMenu = true;
    } else {
      this.showAdminMenu = false;
    }

    this.form = this.formBuilder.group({
        name: ''
    });

    this.genresService.getAll().subscribe(resp => {
      this.genres = resp;
      this.dataSource = new MatTableDataSource(this.genres);
    });
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

  logout() {
    this.authService.logout();
  }

}
