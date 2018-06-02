export interface User {
  id: number;
  email: string;
  nickname: string;
  loginCount:string;
  birthDate: number;
  registrationDate: number;
  roles: Role[]
}

export interface Role {
  id: number;
  authority: string;
}

export interface Author {
  authors: AuthorItem[];
}

export interface AuthorItem {
  id: number;
  name: string;
  birthday: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Book {
  id: number;
  name: string;
  author: AuthorItem;
  date: string;
  description: string;
  genres: Genre[];
  isbn: string;
  viewedCount: number;
  isFavourite: boolean;
}

export interface Books {
  books: Book[];
}

export interface Quote {
  id: number;
  author: AuthorItem;
  body: string;
  book: Book;
  isFavourite: boolean;
}

export interface Reviews {
  reviews: ReviewItem[];
}

export interface ReviewItem {
  id: number;
  author: AuthorItem;
  book: Book;
  grade: number;
  review: string;
  title: string;
}

export interface Themes {
  themes: ThemeItem[];
}

export interface ThemeItem {
  themeId: number;
  title: string;
  creationTime: string;
  msgCount: number;
  author: AuthorItem;
}
