import { Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ErrorComponent } from './error/error.component';
import { AdminAuthorsComponent } from './administration/authors/authors.component';
import { GenresComponent } from './administration/genres/genres.component';
import { QuotesComponent } from './administration/quotes/quotes.component';
import { AdminBooksComponent } from './administration/books/books.component';
import { MainComponent } from './main/main.component';
import { AuthorsComponent } from './authors/authors.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { BooksComponent } from './books/books.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { ForumComponent } from './forum/forum.component';

import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', component: SignInComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'main', component: MainComponent, canActivate: [AuthGuard] },
  { path: 'authors', component: AuthorsComponent, canActivate: [AuthGuard] },
  { path: 'books', component: BooksComponent, canActivate: [AuthGuard] },
  { path: 'themes', component: ForumComponent, canActivate: [AuthGuard] },
  { path: 'reviews/:id', component: ReviewsComponent, canActivate: [AuthGuard] },
  { path: 'favourites', component: FavouritesComponent, canActivate: [AuthGuard] },
  { path: 'admin/authors', component: AdminAuthorsComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/genres', component: GenresComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/quotes', component: QuotesComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/books', component: AdminBooksComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: '**', component: ErrorComponent }
];
