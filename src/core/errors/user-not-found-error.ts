export class UserNotFoundError extends Error {
  constructor() {
    super(`There is not an user with this e-mail in the database!`);
  }
}
