'use strict';

var yepjet   = require('../lib/yepjet.js')('test_key');
var Search   = require('../lib/resources/Search.js').default;
var Flights  = require('../lib/resources/Flights.js').default;
var Orders   = require('../lib/resources/Orders.js').default;
var Bookings = require('../lib/resources/Bookings.js').default;
var version  = require('../package.json').version;

describe('yepjet', function() {
  it('should have the search', function() {
    yepjet.search.should.be.an.instanceOf(Search);
  });

  it('should have the flights', function() {
    yepjet.flights.should.be.an.instanceOf(Flights);
  });

  it('should have the orders', function() {
    yepjet.orders.should.be.an.instanceOf(Orders);
  });

  it('should have the bookings', function() {
    yepjet.bookings.should.be.an.instanceOf(Bookings);
  });

  it('should have a PACKAGE_VERSION', function() {
    yepjet.PACKAGE_VERSION.should.equal(version);
  });
});
