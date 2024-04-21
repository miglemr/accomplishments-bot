export class ResponseError extends Error {
  status: number;

  constructor(status: number, message: string = 'Response error') {
    super(message);
    this.status = status;
  }
}
