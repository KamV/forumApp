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
