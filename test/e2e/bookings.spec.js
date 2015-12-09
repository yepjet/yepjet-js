'use strict';

var yepjet    = require('../..')('key');
var HTTPError = require('../../lib/resources/errors').HTTPError;
var Q         = require('q');
var moment    = require('moment');
var logJSON   = require('../support/log-json.js');
var inspect   = require('util').inspect;
var fs        = require('fs');

describe('Bookings', function() {
  var orderId;
  var flightId;

  before(function() {
    return yepjet.search.query({
      flights: [
        {
          from: 'MAD',
          to: 'FCO',
          departure: moment().add(30, 'days').toDate()
        }
      ],
      passengers: [{ category: 'ADT' }]
    }).then(function(res) {
        flightId = res.flights[0][0].id;
        return yepjet.orders.create([flightId]);
      }).then(function(res) {
        orderId = res.id;
        return orderId;
      });
  });

  describe('#create()', function() {
    describe('when the params are missing', function() {
      var req;

      before(function() {
        req = yepjet.bookings.create();
      });

      it('should return a 400 error', function() {
        return req.should.be.rejectedWith(/400/);
      });

      it('should return a meaningful error message', function() {
        return req.should.be.rejected.then(function(message) {
          return Q.all([
            message.should.have.deep.property('body.error'),
            message.body.message['obj.order_id'][0].msg[0].should.equal('error.path.missing'),
            message.body.message['obj.payment_token'][0].msg[0].should.equal('error.path.missing'),
            message.body.message['obj.travelers'][0].msg[0].should.equal('error.path.missing')
          ]);
        });
      });
    });

    describe('when the params are wrong', function() {
      var req;

      before(function() {
        req = yepjet.bookings.create({
          order_id: null,
          payment_token: {},
          travelers: 123
        });
      });

      it('should return a 400 error', function() {
        return req.should.be.rejectedWith(/400/);
      });

      it('should return a meaningful error message', function() {
        return req.should.be.rejected.then(function(message) {
          return Q.all([
            message.should.have.deep.property('body.error'),
            message.body.message['obj.order_id'][0].msg[0].should.equal('error.expected.jsstring'),
            message.body.message['obj.travelers'][0].msg[0].should.equal('error.expected.jsarray'),
            message.body.message['obj.payment_token'][0].msg[0].should.equal('error.expected.jsstring')
          ]);
        });
      });
    });

    describe('when the booking data is correct', function() {
      var bookingData = {
        travelers: [{ id: '11efaf6f-ae0a-478e-bd64-6c974d5a3f14' }],
        payment_token: '0e7fbee2-51be-4b58-a797-f4fcd0a14621'
      };

      describe('but the order_id is fake', function() {
        var req;

        before(function() {
          bookingData.order_id = 'fakeOrderId';
          req = yepjet.bookings.create(bookingData);
        });

        it('should return a 400 error', function() {
          return req.should.be.rejectedWith(/400/);
        });
      });

      describe('but the order_id is good to go', function() {
        describe('when the order is empty', function() {
          var req;

          before(function() {
            req = yepjet.orders.create().then(function(response) {
              bookingData.order_id = response.id;
              return yepjet.bookings.create(bookingData);
            });
          });

          it('should return a 400 error', function() {
            return req.should.be.rejectedWith(/400/);
          });
        });

        describe('when the order is not empty', function() {
          var req;

          before(function() {
            bookingData.order_id = orderId;
          });

          it('should work and return the correct data', function() {
            var req = yepjet.bookings.create(bookingData);
            return req.should.be.fulfilled.then(function(res) {
              return Q.all([
                res.pnr.should.exist,
                res.id.should.exist,
                res.flights.should.have.length(1)
              ]);
            });
          });
        });
      });
    });
  });
});
