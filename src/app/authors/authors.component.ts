import { Component, OnInit } from '@angular/core';
import { AdminAuthorsService } from '../services/admin.authors.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {

  constructor(private adminAuthorsService: AdminAuthorsService) { }

  ngOnInit() {
    this.adminAuthorsService.getAll().subscribe(resp => {
      console.log('resp', resp);
    });
  }

}
