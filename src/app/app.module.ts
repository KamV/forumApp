import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatToolbarModule,
  MatTableModule,
  MatCheckboxModule,
  MatSelectModule,
  MatMenuModule,
  MatSortModule
 } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { routes } from './app-routing.module';


import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ErrorComponent } from './error/error.component';
import { AuthService } from './services/auth.service';
import { AuthorsComponent } from './administration/authors/authors.component';
import { AuthorsService } from './services/authors.service';
import { GenresComponent } from './administration/genres/genres.component';
import { GenresService } from './services/genres.service';
import { QuotesComponent } from './administration/quotes/quotes.component';
import { QuotesService } from './services/quotes.service';
import { BooksService } from './services/books.service';
import { BooksComponent } from './administration/books/books.component';
import { MainComponent } from './main/main.component';

import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    ErrorComponent,
    AuthorsComponent,
    GenresComponent,
    QuotesComponent,
    BooksComponent,
    MainComponent
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
    MatSelectModule,
    MatMenuModule,
    MatSortModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    AuthService,
    AuthorsService,
    GenresService,
    BooksService,
    QuotesService,
    CookieService,
    AuthGuard,
    AdminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
