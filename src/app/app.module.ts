import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatToolbarModule,
  MatTableModule,
  MatCheckboxModule
 } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { routes } from './app-routing.module';


import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ErrorComponent } from './error/error.component';
import { AuthService } from './services/auth.service';
import { AuthorsComponent } from './authors/authors.component';
import { AdminAuthorsService } from './services/admin.authors.service';
import { GenresComponent } from './genres/genres.component';


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    ErrorComponent,
    AuthorsComponent,
    GenresComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatTableModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    AuthService,
    AdminAuthorsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
