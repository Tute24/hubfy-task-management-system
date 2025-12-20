export class ForbiddenUserError extends Error {
  constructor() {
    super(`Action not allowed for this user.`);
  }
}
