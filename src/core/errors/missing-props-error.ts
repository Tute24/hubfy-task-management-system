export class MissingPropsError extends Error {
  constructor() {
    super('At least one property to update is required.');
  }
}
