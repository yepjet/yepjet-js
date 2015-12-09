'use strict';

var yepjet    = require('../..')('key');
var HTTPError = require('../../lib/resources/errors').HTTPError;
var Q         = require('q');
var moment    = require('moment');
var logJSON = require('../support/log-json.js');
var inspect      = require('util').inspect;
var fs          = require('fs');
var _           = require('underscore');

describe('Travelers', function() {
  var jonSnow = {
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
  };

  describe('#create()', function() {
    describe('when there is no data', function() {
      var req;

      before(function() {
        req = yepjet.travelers.create();
      });

      it('should return a 400 error', function() {
        return req.should.be.rejectedWith(/400/);
      });

      it('should return a meaningful error message', function() {
        return req.should.be.rejected.then(function(message) {
          return Q.all([
            message.body.message['obj.prefix'][0].msg[0].should.equal('error.path.missing'),
            message.body.message['obj.address'][0].msg[0].should.equal('error.path.missing'),
            message.body.message['obj.first_name'][0].msg[0].should.equal('error.path.missing'),
            message.body.message['obj.last_name'][0].msg[0].should.equal('error.path.missing'),
            message.body.message['obj.birth_date'][0].msg[0].should.equal('error.path.missing'),
            message.body.message['obj.gender'][0].msg[0].should.equal('error.path.missing'),
            message.body.message['obj.email'][0].msg[0].should.equal('error.path.missing'),
            message.body.message['obj.phone_number'][0].msg[0].should.equal('error.path.missing')
          ]);
        });
      });
    });

    describe('when data is not correct', function() {
      var req;

      before(function() {
        req = yepjet.travelers.create({
          prefix: 13,
          address: {
            state: 123,
            country: null,
            postal_code: {},
            city: null,
            street: 123
          },
          first_name: null,
          last_name: {},
          birth_date: 'a date?',
          gender: 2323,
          email: null,
          phone_number: new Date()
        });
      });

      it('should return a 400 error', function() {
        return req.should.be.rejectedWith(/400/);
      });

      it('should return a meaningful error message', function() {
        return req.should.be.rejected.then(function(message) {
          return Q.all([
            message.body.message['obj.prefix'][0].msg[0].should.equal('error.expected.jsstring'),
            message.body.message['obj.address.state'][0].msg[0].should.equal('error.expected.jsstring'),
            message.body.message['obj.address.country'][0].msg[0].should.equal('error.expected.jsstring'),
            message.body.message['obj.address.postal_code'][0].msg[0].should.equal('error.expected.jsstring'),
            message.body.message['obj.address.city'][0].msg[0].should.equal('error.expected.jsstring'),
            message.body.message['obj.address.street'][0].msg[0].should.equal('error.expected.jsstring'),
            message.body.message['obj.first_name'][0].msg[0].should.equal('error.expected.jsstring'),
            message.body.message['obj.last_name'][0].msg[0].should.equal('error.expected.jsstring'),
            message.body.message['obj.birth_date'][0].msg[0].should.equal('error.expected.date.isoformat'),
            message.body.message['obj.gender'][0].msg[0].should.equal('error.expected.jsstring'),
            message.body.message['obj.email'][0].msg[0].should.equal('error.expected.jsstring'),
            message.body.message['obj.phone_number'][0].msg[0].should.equal('not a valid phone number')
          ]);
        });
      });
    });

    describe('when the data is correct', function() {
      var req;

      before(function() {
        req = yepjet.travelers.create(jonSnow);
      });

      it('should work', function() {
        return req.should.be.fulfilled.then(function(response) {
          jonSnow.id = response.id;
          return response.should.deep.equal(jonSnow);
        });
      });
    });
  });

  describe('#fetch()', function() {
    describe('when the traveler id is fake', function() {
      var req;

      before(function() {
        req = yepjet.travelers.fetch('fakeId');
      });

      it('should return a 404 error', function() {
        return req.should.be.rejectedWith(/404/);
      });
    });

    describe('when the traveler id is real', function() {
      var req;

      before(function() {
        req = yepjet.travelers.fetch(jonSnow.id);
      });

      it('should work', function() {
        return req.should.be.fulfilled.then(function(response) {
          return response.should.deep.equal(jonSnow);
        });
      });
    });
  });
});
