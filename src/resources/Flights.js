'use strict';

import ApiResource from './ApiResource';

class Flights extends ApiResource {
  constructor(conf) {
    super(conf, 'flights');
  }

  fetch(flightId) {
    return this.request({
      method: 'GET',
      path: ':id',
      params: {
        id: flightId
      }
    });
  }
}

export default Flights;
