import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
        login: '',
        password: '',
        email: '',
        nickname: '',
        birthDate: ''
    });
  }

  signup() {
    this.authService.signUp(this.form.value).subscribe(resp => {
      localStorage.setItem('currentUser', JSON.stringify({nickname: resp.nickname, isAuth: true, role: resp.roles[0].authority }));
      this.router.navigate(['main']);
    });
  }

}
