export class User {
  id: number = 0;
  username: string = '';
  password: string = '';
  email: string = '';
  role: string = '';
  active: boolean = true;

  constructor(
    id: number = 0,
    username: string = '',
    password: string = '',
    email: string = '',
    role: string = '',
    active: boolean = true

  ) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email =email;
    this.role = role;
    this.active = active;
  }
}

