import { Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ErrorComponent } from './error/error.component';
import { AuthorsComponent } from './authors/authors.component';
import { GenresComponent } from './genres/genres.component';

export const routes: Routes = [
  { path: '', component: SignInComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'admin/authors', component: AuthorsComponent },
  { path: 'admin/genres', component: GenresComponent },
  { path: '**', component: ErrorComponent }
];
