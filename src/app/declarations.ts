export interface User {
  id: number;
  login: string;
  password: string;
  name: string;
  department: string;
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

export interface Item {
  id: number,
  name: string,
  minValue: number,
  checkDate: Date,
  value: number,
  monthlyConsumption: number,
  nextMonthlyConsumption: number,
  valueInWork: number,
  annualConsumption: number
}

export interface Material {
  id: number;
  name: string;
  articule: string;
}

export interface Request {
  id: number;
  author: User;
  name: string;
  value: number;
  date: string;
  comment: string;
  status: string;
}

export interface StockItem {
  id: number;
  name: string;
  minValue: number;
  checkDate: string;
  value: number;
  valueInWork: number;
  annualConsumption: number;
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

export interface Messages {
  messages: MessageItem[];
}

export interface MessageItem {
  messageId: number;
  body: string;
  creationTime: string;
  author: AuthorItem;
}
