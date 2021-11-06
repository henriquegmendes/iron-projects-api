class InvalidBodyRequestException extends Error {
  constructor() {
    super();

    this.status = 504;
    this.message = 'Invalid Body Request';
  }
}

export default InvalidBodyRequestException;
