export class HttpException extends Error {
  public status: number;
  public message: string;
  public path: string;
  public code: string;

  constructor(status: number, code?: string, message?: string, path?: string) {
    super(message);
    this.status = status;
    this.code = code;
    this.message = message;
    this.path = path;
  }
}
