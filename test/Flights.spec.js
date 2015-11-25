'use strict';

var Flights  = require('../lib/resources/Flights.js').default;
var sinon   = require('sinon');
var host    = 'www.example.com';
var version = 'v1';

describe('Flights', function() {
  var flights;

  beforeEach(function() {
    flights = new Flights({
      host: host,
      version: version
    });
  });

  describe('name', function() {
    it('should be "flights"', function() {
      flights.name.should.equal('flights');
    });
  });

  describe('#fetch()', function() {
    it('should invoke #request() with get params', function() {
      var stub = sinon.stub(flights, 'request');
      flights.fetch('flightid');
      stub.should.have.been.calledWith({
        method: 'GET',
        params: {
          id: 'flightid'
        },
        path: ':id'
      });
    });
   });
});
