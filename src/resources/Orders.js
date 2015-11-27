'use strict';

import ApiResource from './ApiResource';

class Orders extends ApiResource {
  constructor(conf) {
    super(conf, 'orders');
  }

  create() {
    return this.request({
      method: 'POST'
    });
  }

  addFlight(oid, fid) {
    return this.request({
      method: 'POST',
      path: ':orderId/flights/:flightId',
      params: {
        orderId: oid,
        flightId: fid
      }
    });
  }
}

export default Orders;
