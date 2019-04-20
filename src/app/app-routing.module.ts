import { Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ErrorComponent } from './error/error.component';
import { AdminMaterialsComponent } from './administration/materials/materials.component';
import { GenresComponent } from './administration/genres/genres.component';
import { QuotesComponent } from './administration/quotes/quotes.component';
import { AdminBooksComponent } from './administration/books/books.component';
import { MainComponent } from './main/main.component';
import { AuthorsComponent } from './authors/authors.component';
import { MaterialsComponent } from './materials/materials.component';
import { BooksComponent } from './books/books.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { ForumComponent } from './forum/forum.component';
import { ConversationComponent } from './conversation/conversation.component';

import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', component: SignInComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'main', component: MainComponent },
  { path: 'authors', component: AuthorsComponent },
  { path: 'books', component: BooksComponent },
  { path: 'themes', component: ForumComponent },
  { path: 'reviews/:id', component: ReviewsComponent },
  { path: 'conversation/:themeId', component: ConversationComponent },
  { path: 'materials', component: MaterialsComponent },
  { path: 'admin/materials', component: AdminMaterialsComponent },
  { path: 'admin/genres', component: GenresComponent },
  { path: 'admin/quotes', component: QuotesComponent },
  { path: 'admin/books', component: AdminBooksComponent },
  { path: '**', component: ErrorComponent }
];
