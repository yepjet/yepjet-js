'use strict';

import ApiResource from './ApiResource';

class Orders extends ApiResource {
  constructor(conf) {
    super(conf, 'orders');
  }

  create(flights) {
    var req = {
      method: 'POST'
    };

    if (Array.isArray(flights) && flights.length) {
      req.data = { flights: [] };
      flights.forEach(function(flight) {
        if (typeof flight === 'string' || flight instanceof String) {
          req.data.flights.push({ id: flight });
        } else if (typeof flight === 'object' && flight.id) {
          req.data.flights.push({ id: flight.id });
        }
      });
    };

    return this.request(req);
  }

  addFlight(oid, fid) {
    return this.request({
      method: 'PUT',
      path: ':orderId/flights/:flightId',
      params: {
        orderId: oid,
        flightId: fid
      }
    });
  }
}

export default Orders;
