'use strict';

var Bookings  = require('../lib/resources/Bookings.js').default;
var sinon   = require('sinon');
var host    = 'www.example.com';
var version = 'v1';

describe('Bookings', function() {
  var bookings;

  beforeEach(function() {
    bookings = new Bookings({
      host: host,
      version: version
    });
  });

  describe('name', function() {
    it('should be "bookings"', function() {
      bookings.name.should.equal('bookings');
    });
  });

  describe('#create()', function() {
    describe('when invoked without params', function() {
      it('should invoke #request() with create params', function() {
        var stub = sinon.stub(bookings, 'request');
        bookings.create();
        stub.should.have.been.calledWith({
          method: 'POST',
          data: {}
        });
      });
    });

    describe('when invoked with a booking object', function() {
      it('should invoke #request() with create params', function() {
        var stub = sinon.stub(bookings, 'request');
        bookings.create({ booking: 'object' });
        stub.should.have.been.calledWith({
          method: 'POST',
          data: {
            booking: 'object'
          }
        });
      });
    });
  });
});
