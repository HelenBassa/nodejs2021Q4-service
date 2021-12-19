import { v4 } from 'uuid';

class User {
  id: string;
  name: string;
  login: string;
  password: string;

  constructor(name: string, login: string, password: string) {
    this.id = v4();
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user: User | undefined) {
    if (user) {
      const { id, name, login } = user;
      return { id, name, login };
    }
  }
}

export default User;
