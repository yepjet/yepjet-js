'use strict';

var yepjet    = require('../..')('key');
var HTTPError = require('../../lib/resources/errors').HTTPError;
var Q         = require('q');
var moment    = require('moment');
var logJSON = require('../support/log-json.js');
var inspect      = require('util').inspect;
var fs          = require('fs');

describe('Orders', function() {
  var orderId;
  var flightId;

  before(function() {
    return yepjet.search.query({
      flights: [
        {
          from: 'MAD',
          to: 'FCO',
          departure: moment().add(30, 'days').toDate(),
          passengers: [{ category: 'ADT' }]
        }
      ]}).then(function(res) {
        flightId = res.flights[0][0].id;
      }, function(err) {
        console.warn(err)
      });
  });

  describe('#create()', function() {
    describe('when there are no flights added', function() {
      var req;

      before(function() {
        req = yepjet.orders.create();
      });

      it('should return an empty array of flights and an order id', function() {
        return req.should.be.fulfilled.then(function(order) {
          orderId = order.id;
          return Q.all([
            order.id.should.exist,
            order.flights.should.be.empty
          ]);
        });
      });
    });

    describe('when some flights are added', function() {
      describe('and the ids are fake', function() {
        var req;

        before(function() {
          req = yepjet.orders.create(['foo', { id: 'bar' }]);
        });

        it('should return a 400 error', function() {
          return req.should.be.rejectedWith(/400/);
        });
      });

      describe('and the ids are valid', function() {
        var req;

        before(function() {
          req = yepjet.orders.create([flightId]);
        });

        it('should return an array of flights with just the selected flight', function() {
          return req.should.be.fulfilled.then(function(order) {
            return Q.all([
              order.id.should.exist,
              order.flights.should.have.length(1),
              order.flights[0].should.have.property('id').and.equal(flightId)
            ]);
          });
        });
      });
    });
  });

  describe('#addFlight()', function() {
    describe('when there is a fake flight id added', function() {
      var req;

      before(function() {
        req = yepjet.orders.addFlight(orderId, 'fakeFlightId');
      });

      it('should return a 404 error', function() {
        return req.should.be.rejectedWith(/404/);
      });
    });

    describe('when there is a real flight id added', function() {
      var req;

      before(function() {
        req = yepjet.orders.addFlight(orderId, flightId);
      });

      it('should return a 404 error', function() {
        return req.should.be.fulfilled.then(function(order) {
          return Q.all([
            order.id.should.exist,
            order.flights.should.have.length(1),
            order.flights[0].should.have.property('id').and.equal(flightId)
          ]);
        });
      });
    });
  });
});
