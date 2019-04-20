import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MatSort, MatTableDataSource } from '@angular/material';
import { ItemsService } from '../services/items.service';
import { AuthService } from '../services/auth.service';
import { Item } from '../declarations';

@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.css']
})
export class MaterialsComponent implements OnInit {

  dataItemsSource: any;

  displayedItemColumns = ['name', 'minValue', 'checkDate', 'value', 'monthlyConsumption', 'nextMonthlyConsumption', 'valueInWork', 'annualConsumption'];

  showAdminMenu = false;

  items: Item[];

  constructor(
    private itemsService: ItemsService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser && currentUser.role == 'ADMIN') {
      this.showAdminMenu = true;
    } else {
      this.showAdminMenu = false;
    }

    this.getItems();
  }

  getItems() {
    this.itemsService.getItems().subscribe(resp => {
      this.items = resp;
      this.dataItemsSource = new MatTableDataSource(this.items);
    },
    error => {
          this.router.navigate(['signin']);
    });
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

  logout() {
    this.authService.logout();
  }

}
