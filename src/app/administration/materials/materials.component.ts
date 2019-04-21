import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MaterialsService } from '../../services/materials.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { AuthService } from '../../services/auth.service';
import { Material } from '../../declarations';

@Component({
  selector: 'app-admin-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.css']
})
export class AdminMaterialsComponent implements OnInit {

  form: FormGroup;

  dataSource;

  displayedColumns = ['name', 'articule', 'updateButton'];

  showAdminMenu = false;

  materials: Material[];

  constructor(private formBuilder: FormBuilder,
    private materialsService: MaterialsService,
    private authService: AuthService,
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
        articule: ''
    });

    this.materialsService.getMaterials().subscribe(resp => {
      this.materials = resp;
      this.dataSource = new MatTableDataSource(this.materials);
    },
    error => {
          this.router.navigate(['signin']);
    });
  }

  addMaterial() {
    this.materialsService.addMaterial(this.form.value.name, this.form.value.articule).subscribe(resp => {
      this.materials = resp;
      this.dataSource = new MatTableDataSource(this.materials);
    },
    error => {
          this.router.navigate(['signin']);
    });
  }

  updateMaterial(material: any) {
    this.materialsService.updateMaterial(material).subscribe(resp => {
      this.materials = resp;
      this.dataSource = new MatTableDataSource(this.materials);
    },
    error => {
          this.router.navigate(['signin']);
    });

  }

  logout() {
    this.authService.logout();
  }

}
