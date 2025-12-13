export class MissingSecretKeyError extends Error {
  constructor() {
    super('Secret Key is missing from .env!');
  }
}
