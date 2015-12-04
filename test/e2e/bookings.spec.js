'use strict';

var yepjet    = require('../..')('key');
var HTTPError = require('../../lib/resources/errors').HTTPError;
var Q         = require('q');
var moment    = require('moment');
var logJSON   = require('../support/log-json.js');
var inspect   = require('util').inspect;
var fs        = require('fs');

describe.only('Bookings', function() {
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
            message.body.message['obj.payment'][0].msg[0].should.equal('error.path.missing'),
            message.body.message['obj.traveler'][0].msg[0].should.equal('error.path.missing')
          ]);
        });
      });
    });

    describe('when the params are wrong', function() {
      var req;

      before(function() {
        req = yepjet.bookings.create({
          order_id: null,
          payment: {},
          traveler: 123
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
            message.body.message['obj.traveler.prefix'][0].msg[0].should.equal('error.path.missing'),
            message.body.message['obj.traveler.address'][0].msg[0].should.equal('error.path.missing'),
            message.body.message['obj.traveler.first_name'][0].msg[0].should.equal('error.path.missing'),
            message.body.message['obj.traveler.last_name'][0].msg[0].should.equal('error.path.missing'),
            // message.body.message['obj.traveler.delivery_info'][0].msg[0].should.equal('error.path.missing'),
            message.body.message['obj.traveler.birth_date'][0].msg[0].should.equal('error.path.missing'),
            message.body.message['obj.traveler.gender'][0].msg[0].should.equal('error.path.missing'),
            message.body.message['obj.traveler.email'][0].msg[0].should.equal('error.path.missing'),
            message.body.message['obj.traveler.phone_number'][0].msg[0].should.equal('error.path.missing'),
            message.body.message['obj.payment.number'][0].msg[0].should.equal('error.path.missing'),
            message.body.message['obj.payment.cvv'][0].msg[0].should.equal('error.path.missing'),
            message.body.message['obj.payment.billing_address'][0].msg[0].should.equal('error.path.missing'),
            message.body.message['obj.payment.exp_date'][0].msg[0].should.equal('error.path.missing'),
            message.body.message['obj.payment.full_name'][0].msg[0].should.equal('error.path.missing')
          ]);
        });
      });
    });

    describe('when the booking data is correct', function() {
      var bookingData = {
        traveler: {
          prefix: 'Mr.',
          first_name: 'Jon',
          last_name: 'Snow',
          gender: 'M',
          email: 'you@knownothing.com',
          birth_date: moment().subtract(20, 'years').toDate(),
          phone_number: '0123456789',
          address: {
            street: 'Tower A',
            city: 'The Wall',
            state: 'North',
            postal_code: '12345',
            country: 'GB'
          }
        },
        payment: {
          billing_address: {
            street: 'Tower A',
            city: 'The Wall',
            state: 'North',
            postal_code: '12345',
            country: 'GB'
          },
          number: '4141414141414141',
          full_name: 'Jon Snow',
          exp_date: '05/19',
          cvv: '123'
        } 
      };

      bookingData.delivery_info = bookingData.traveler.address;

      describe('but the order_id is fake', function() {
        var req;

        before(function() {
          bookingData.order_id = 'fakeOrderId';
          req = yepjet.bookings.create(bookingData).then(null, function(err) {
            logJSON(err);
          });
        });

        it('should return a 400 error', function() {
          return req.should.be.rejectedWith(/400/);
        });
      });

      describe.skip('but the order_id is good to go', function() {
        var req;

        before(function() {
          bookingData.order_id = orderId;
          req = yepjet.bookings.create(bookingData);
        });

        it('should work and return the correct data', function() {
          return req.should.be.fulfilled.then(function(res) {
            return Q.all([
              res.pnr.should.exist
            ]);
          });
        });
      });
    });
  });
});
