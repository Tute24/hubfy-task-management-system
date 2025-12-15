export class TaskNotFoundError extends Error {
  constructor() {
    super(`Couldn't find this task on the database.`);
  }
}
