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
  MatSortModule,
  MatDialogModule,
  MatListModule,
  MatIconModule,
  MatGridListModule
 } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { routes } from './app-routing.module';


import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ErrorComponent } from './error/error.component';
import { AuthService } from './services/auth.service';
import { AdminMaterialsComponent } from './administration/materials/materials.component';
import { AuthorsService } from './services/authors.service';
import { AdminStockComponent } from './administration/stock/stock.component';
import { GenresService } from './services/genres.service';
import { AdminRequestsComponent } from './administration/requests/requests.component';
import { QuotesService } from './services/quotes.service';
import { BooksService } from './services/books.service';
import { ItemsService } from './services/items.service';
import { AdminBooksComponent } from './administration/books/books.component';
import { MainComponent } from './main/main.component';

import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { AuthorsComponent } from './authors/authors.component';
import { AboutAuthorDialogComponent } from './authors/about-author-dialog/about-author-dialog.component';
import { MaterialsComponent } from './materials/materials.component';
import { RequestCreatingComponent } from './request-creating/request-creating.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { ReviewsService } from './services/reviews.service';
import { ReviewChangeDialogComponent } from './reviews/review-change-dialog/review-change-dialog.component';
import { ForumComponent } from './forum/forum.component';
import { ForumService } from './services/forum.service';
import { ForumDialogComponent } from './forum/forum-dialog/forum-dialog.component';
import { ConversationComponent } from './conversation/conversation.component';
import { ChangeMessageDialogComponent } from './conversation/change-message-dialog/change-message-dialog.component';
import { MaterialsService } from './services/materials.service';
import { RequestsService } from './services/requests.service';
import { StockService } from './services/stock.service';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    ErrorComponent,
    AdminMaterialsComponent,
    AdminStockComponent,
    AdminRequestsComponent,
    AdminBooksComponent,
    MainComponent,
    AuthorsComponent,
    AboutAuthorDialogComponent,
    MaterialsComponent,
    RequestCreatingComponent,
    ReviewsComponent,
    ReviewChangeDialogComponent,
    ForumComponent,
    ForumDialogComponent,
    ConversationComponent,
    ChangeMessageDialogComponent
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
    MatDialogModule,
    MatListModule,
    MatIconModule,
    MatGridListModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  entryComponents: [
    AboutAuthorDialogComponent,
    ReviewChangeDialogComponent,
    ForumDialogComponent,
    ChangeMessageDialogComponent
  ],
  providers: [
    AuthService,
    AuthorsService,
    GenresService,
    BooksService,
    QuotesService,
    ReviewsService,
    ForumService,
    CookieService,
    ItemsService,
    AuthGuard,
    AdminGuard,
    MaterialsService,
    RequestsService,
    StockService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
