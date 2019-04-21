import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { RequestsService } from '../services/requests.service';
import { AuthService } from '../services/auth.service';
import { MaterialsService } from '../services/materials.service';
import { Request, Material } from '../declarations';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-request-creating',
  templateUrl: './request-creating.component.html',
  styleUrls: ['./request-creating.component.css']
})
export class RequestCreatingComponent implements OnInit {

  form: FormGroup;

  dataSource: any;

  displayedColumns = ['name', 'value', 'date', 'comment', 'status', 'deleteButton'];

  showAdminMenu = false;

  requests: Request[];

  materials: Material[];

  currentUser: any;

  minDate = new Date();

  constructor(
    private formBuilder: FormBuilder,
    private requestsService: RequestsService,
    private authService: AuthService,
    private materialsService: MaterialsService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (this.currentUser && this.currentUser.role == 'ADMIN') {
      this.showAdminMenu = true;
    } else {
      this.showAdminMenu = false;
    }

    this.form = this.formBuilder.group({
        name: '',
        value: '',
        date: '',
        comment: ''
    });

    this.getMaterials();

    this.dataSource = new MatTableDataSource(this.requests);

    this.getRequests();
  }

  getRequests() {
    this.requestsService.getRequests(this.currentUser.id).subscribe(resp => {
      this.requests = resp;
      this.dataSource = new MatTableDataSource(this.requests);
    },
    error => {
      this.router.navigate(['signin']);
    });
  }

  getMaterials() {
    this.materialsService.getMaterials().subscribe(resp => {
      this.materials = resp;
    },
    error => {
          this.router.navigate(['signin']);
    });
  }

  addRequest() {
    if (this.form.valid) {
      this.requestsService.addRequests(this.currentUser.id, this.form.value).subscribe(resp => {
        this.requests = resp;
        this.dataSource = new MatTableDataSource(this.requests);

        this.form.reset();
      },
      error => {
            this.router.navigate(['signin']);
      });
    }
  }

  deleteOrCloseRequest(request) {
    this.requestsService.deleteRequests(request.id, request.author.id, request.name, request.value, request.status).subscribe(resp => {
      this.requests = resp;
      this.dataSource = new MatTableDataSource(this.requests);
    },
    error => {
      this.router.navigate(['signin']);
    });
  }

  getStatusColor(status) {
    if (status === 'Одобрено') {
      return 'green';
    }

    if (status === 'Отказано') {
      return 'red';
    } else {
      return 'black';
    }
  }

  getAction(status) {
    if (status === 'Одобрено') {
      return 'Завершить';
    }

    if (status === 'Отказано') {
      return 'Закрыть';
    } else {
      return 'Удалить';
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  // openDialog(book: Book) {
  // }
  //
  // showReview(book: Book) {
  //   this.router.navigate(['reviews', book.id]);
  // }
  //
  // showAction(book: Book) {
  //   return !book.isFavourite ? 'Добавить в избранное' : 'Убрать из избранного';
  // }

  // addOrDeleteFromFavouritesBooks(book: Book) {
  //   let item = {
  //     id: book.id,
  //     add: !book.isFavourite
  //   };
  //
  //   this.booksService.addOrDeleteFromFavouritesBooks(item).subscribe(resp => {
  //     this.books[this.books.indexOf(book)].isFavourite = !book.isFavourite;
  //     this.dataSource = new MatTableDataSource(this.books);
  //   },
  //   error => {
  //         this.router.navigate(['signin']);
  //   });
  // }

  logout() {
    this.authService.logout();
  }

}
