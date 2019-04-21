import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { RequestsService } from '../../services/requests.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { AuthService } from '../../services/auth.service';
import { Request } from '../../declarations';

@Component({
  selector: 'app-admin-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class AdminRequestsComponent implements OnInit {

  form: FormGroup;

  dataSource;

  requests: Request[];

  searchValues: any;
  selectedParamValue: string;
  selectedSearchValue: any;

  displayedColumns = ['name', 'value', 'authorName', 'departament', 'date', 'comment', 'status', 'updateButton'];

  showAdminMenu = false;

  statuses = ['Одобрено', 'Отказано', 'На рассмотрении'];

  selectedStatus: string;

  constructor(private formBuilder: FormBuilder,
    private requestsService: RequestsService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser && currentUser.role == 'ADMIN') {
      this.showAdminMenu = true;
    } else {
      this.showAdminMenu = false;
    }

    // this.form = this.formBuilder.group({
    //   book: '',
    //   body: '',
    //   author: ''
    // });

    this.requestsService.getAll().subscribe(resp => {
      this.requests = resp;
      this.dataSource = new MatTableDataSource(resp.splice(0, resp.length));
    },
    error => {
          this.router.navigate(['signin']);
    });
  }

  updateRequestStatus(request) {
    this.requestsService.updateRequestStatus(request.id, request.status, request.name, request.value).subscribe(resp => {
      this.requests = resp;
      this.dataSource = new MatTableDataSource(resp.splice(0, resp.length));
    },
    error => {
          this.router.navigate(['signin']);
    });
  }

  // changeSelectedValue(value: string) {
  //   if (value == 'Автор') {
  //     this.searchValues = this.authors;
  //   } else {
  //     this.searchValues = this.books;
  //   }
  // }

  // getQuotes() {
  //   if (this.selectedParamValue == 'Автор') {
  //     this.quotesService.getAuthorQuotes(this.selectedSearchValue).subscribe(resp => {
  //       this.quotes = resp;
  //       this.dataSource = new MatTableDataSource(this.quotes);
  //     },
  //     error => {
  //           this.router.navigate(['signin']);
  //     });
  //   } else {
  //     this.quotesService.getBookQuotes(this.selectedSearchValue).subscribe(resp => {
  //       this.quotes = resp;
  //       this.dataSource = new MatTableDataSource(this.quotes);
  //     },
  //     error => {
  //           this.router.navigate(['signin']);
  //     });
  //   }
  //
  // }
  //
  // updateQuote(quote: Quote) {
  //   this.quotesService.updateQuote(quote).subscribe(resp => {
  //     console.log(resp);
  //   },
  //   error => {
  //         this.router.navigate(['signin']);
  //   });
  // }
  //
  // deleteQuote(quote: Quote) {
  //   this.quotesService.deleteQuote(quote).subscribe(resp => {
  //     this.quotes.splice(this.quotes.indexOf(resp), 1);
  //     this.dataSource = new MatTableDataSource(this.quotes);
  //   },
  //   error => {
  //         this.router.navigate(['signin']);
  //   });
  // }

  logout() {
    this.authService.logout();
  }

}
