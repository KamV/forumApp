import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  form: FormGroup;

  errorAuth: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
        login: '',
        password: '',
    });
  }

  login() {
    this.authService.signIn(this.form.value.login, this.form.value.password).subscribe(resp => {
      localStorage.setItem(
        'currentUser',
        JSON.stringify({
          token: resp.token,
          id: resp.id,
          isAuth: true,
          name: resp.name,
          department: resp.department,
          role: resp.role
        }));

      if (resp.role === 'ADMIN') {
        this.router.navigate(['materials']);
      } else {
        this.router.navigate(['request-creating']);
      }  
      // this.authService.getMe().subscribe(resp => {
      //   localStorage.setItem('currentUser', JSON.stringify({id: resp.id, isAuth: true, role: resp.roles[0].authority }));
      //   this.router.navigate(['favourites']);
      // });
    },
    error => {
          this.errorAuth = true;
    });
  }

}
