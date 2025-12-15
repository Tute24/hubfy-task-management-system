export class MissingParamError extends Error {
  constructor() {
    super('Task Id is missing from the request.');
  }
}
