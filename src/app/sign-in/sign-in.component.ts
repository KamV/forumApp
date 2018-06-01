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
      this.authService.getMe().subscribe(resp => {
        localStorage.setItem('currentUser', JSON.stringify({id: resp.id, isAuth: true, role: resp.roles[0].authority }));
        this.router.navigate(['main']);
      });
    });
  }

}
