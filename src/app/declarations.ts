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
  id: number,
  authority: string
}

export interface Author {
  authors: AuthorItem[];
}

export interface AuthorItem {
  id: number,
  name: string,
  birthday: string;
}

export interface Genre {
  id: number,
  name: string,
}
