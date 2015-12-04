'use strict';

import ApiResource from './ApiResource';

class Bookings extends ApiResource {
  constructor(conf) {
    super(conf, 'bookings');
  }

  create(booking = {}) {
    return this.request({
      method: 'POST',
      data: booking
    });
  }
}

export default Bookings;
