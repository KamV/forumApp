import { Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ErrorComponent } from './error/error.component';
import { AuthorsComponent } from './authors/authors.component';
import { GenresComponent } from './genres/genres.component';
import { QuotesComponent } from './quotes/quotes.component';
import { BooksComponent } from './books/books.component';
import { MainComponent } from './main/main.component';

import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', component: SignInComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'main', component: MainComponent, canActivate: [AuthGuard] },
  { path: 'admin/authors', component: AuthorsComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/genres', component: GenresComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/quotes', component: QuotesComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/books', component: BooksComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: '**', component: ErrorComponent }
];
