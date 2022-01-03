import { v4 } from 'uuid';

class User {
  id: string;

  name: string;

  login: string;

  password: string;

  /**
   * Creates an instance of user
   * @param name - name of user
   * @param login - login of user
   * @param password - password of user
   */
  constructor(name: string, login: string, password: string) {
    this.id = v4();
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * Returns data from user object ready to send in reply (without password)
   * @param user - user object
   * @returns object with id, name, login without password
   */
  static toResponse(user: User | undefined) {
    if (user) {
      const { id, name, login } = user;
      return { id, name, login };
    }
    return false;
  }
}

export default User;
