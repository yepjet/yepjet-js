'use strict';

import ApiResource from './ApiResource';

class Travelers extends ApiResource {
  constructor(conf) {
    super(conf, 'travelers');
  }

  create(traveler = {}) {
    return this.request({
      method: 'POST',
      data: traveler
    });
  }

  fetch(travelerId) {
    return this.request({
      method: 'GET',
      path: ':id',
      params: {
        id: travelerId
      }
    });
  }
}

export default Travelers;
