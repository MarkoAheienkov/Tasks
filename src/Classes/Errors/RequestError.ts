class RequestError extends Error {
  status: number | void;
  constructor(message?: string, status?: number | void) {
    super(message);
    this.status = status;
  }
}

export default RequestError;
