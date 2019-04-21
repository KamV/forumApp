import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { StockService } from '../../services/stock.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { AuthService } from '../../services/auth.service';
import { MaterialsService } from '../../services/materials.service';
import { StockItem, Material } from '../../declarations';

@Component({
  selector: 'app-admin-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class AdminStockComponent implements OnInit {

  form: FormGroup;

  dataSource;

  displayedColumns = ['name', 'minValue', 'checkDate', 'value', 'updateButton', 'deleteButton'];

  showAdminMenu = false;

  stockItems: StockItem[];

  materials: Material[];

  constructor(private formBuilder: FormBuilder,
    private stockService: StockService,
    private authService: AuthService,
    private materialsService: MaterialsService,
    private router: Router) { }

  ngOnInit() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser && currentUser.role == 'ADMIN') {
      this.showAdminMenu = true;
    } else {
      this.showAdminMenu = false;
    }

    this.form = this.formBuilder.group({
      name: '',
      minValue: '',
      checkDate: '',
      value: ''
    });

    this.getMaterials();
    this.getStockItems();
  }

  getStockItems() {
    this.stockService.getAll().subscribe(resp => {
      this.stockItems = resp;
      this.dataSource = new MatTableDataSource(this.stockItems);
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

  addStockItem() {
    if (this.form.valid) {
      this.stockService.addItem(this.form.value).subscribe(resp => {
        this.stockItems = resp;
        this.dataSource = new MatTableDataSource(this.stockItems);

        this.form.reset();
      },
      error => {

      });
    }
  }

  updateStockItem(item) {
    this.stockService.updateItem(item).subscribe(resp => {
      this.stockItems = resp;
      this.dataSource = new MatTableDataSource(this.stockItems);
    },
    error => {

    });
  }

  deleteStockItem(item) {
    this.stockService.deleteItem(item.id).subscribe(resp => {
      this.stockItems = resp;
      this.dataSource = new MatTableDataSource(this.stockItems);
    },
    error => {

    });
  }

  getCheckDate(date) {
    return new Date(date);
  }

  getColor(value, minValue) {
    return value > minValue ? 'black' : 'red';
  }

  getDateColor(date) {
    let currentDate = new Date();
    var parts = date.split('.')
    let checkDate = new Date(Number(parts[2]), Number(parts[1] - 1), Number(parts[0]));
    let miliseconds = checkDate.getTime() - currentDate.getTime();
    let seconds = Math.floor(miliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);
    if (days > 30) {
      return 'black';
    }

    return 'red';
  }

  // addGenre() {
  //   this.genresService.addGenre(this.form.value).subscribe(resp => {
  //     this.genres.push(resp);
  //     this.dataSource = new MatTableDataSource(this.genres);
  //
  //     this.form.reset();
  //   },
  //   error => {
  //         this.router.navigate(['signin']);
  //   });
  // }
  //
  // updateGenre(genre: any) {
  //   this.genresService.updateGenre(genre).subscribe(resp => {
  //     console.log(genre);
  //   },
  //   error => {
  //         this.router.navigate(['signin']);
  //   });
  // }
  //
  // deleteGenre(genre: any) {
  //   this.genresService.deleteGenre(genre).subscribe(resp => {
  //     this.genres.splice(this.genres.indexOf(resp), 1);
  //     this.dataSource = new MatTableDataSource(this.genres);
  //   },
  //   error => {
  //         this.router.navigate(['signin']);
  //   });
  //
  // }

  logout() {
    this.authService.logout();
  }

}
