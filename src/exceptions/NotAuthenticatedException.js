class NotAuthenticatedException extends Error {
  constructor() {
    super();

    this.status = 401;
    this.message = 'Not Authorized';
  }
}

export default NotAuthenticatedException;
