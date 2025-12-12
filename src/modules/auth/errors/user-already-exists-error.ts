export class UserAlreadyExistsError extends Error {
  constructor() {
    super(`There's already an user with this e-mail on the database!`);
  }
}
