'use strict';

var yepjet    = require('../..')('key');
var HTTPError = require('../../lib/resources/errors').HTTPError;
var Q         = require('q');
var moment    = require('moment');
var logJSON = require('../support/log-json.js');
var inspect      = require('util').inspect;
var fs          = require('fs');

describe('Flights', function() {
  describe('#fetch()', function() {
    describe('when it has a wrong flight id', function() {
      var req;

      before(function() {
        req = yepjet.flights.fetch('foo');
      });

      it('should return a 404 error', function() {
        return req.should.be.rejectedWith(/404/);
      });
    });

    describe('when it has an existing flight id', function() {
      var flight;

      before(function() {
        return yepjet.search.query({
          flights: [
            {
              from: 'SFO',
              to: 'JFK',
              departure: moment().add(1, 'days').toDate(),
              passengers: [{ category: 'ADT' }]
            }
          ]
        }).then(function(res) {
          flight = res['flights'][0][0];
        });
      });

      it('should return the selected flight', function() {
        return yepjet.flights.fetch(flight.id).should.be.eventually.fulfilled.then(function(res) {
          return Q.all([
            res.id.should.equal(flight.id),
            res.price.should.be.defined,
            res.passenger.should.be.defined,
            res.segments.should.not.be.empty
          ]);
        });
      });
    });
  });
});
