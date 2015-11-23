'use strict';

class NetworkError extends Error {
  constructor(message = 'Something wrong with the network') {
    super(message);
    this.name = 'NetworkError';
  }
}

class HTTPError extends Error {
  constructor(message = 'Something wrong with the HTTP request', body) {
    super(message);
    this.name = 'HTTPError';
    this.body = body;
  }
}

export {NetworkError, HTTPError};
