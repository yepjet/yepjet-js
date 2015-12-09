'use strict';

var Travelers = require('../lib/resources/Travelers.js').default;
var sinon     = require('sinon');
var moment    = require('moment');
var host      = 'www.example.com';
var version   = 'v1';

describe('Travelers', function() {
  var travelers;

  beforeEach(function() {
    travelers = new Travelers({
      host: host,
      version: version
    });
  });

  describe('name', function() {
    it('should be "travelers"', function() {
      travelers.name.should.equal('travelers');
    });
  });

  describe('#create()', function() {
    describe('when invoked without params', function() {
      it('should invoke #request() with create params', function() {
        var stub = sinon.stub(travelers, 'request');
        travelers.create();
        stub.should.have.been.calledWith({
          method: 'POST',
          data: {}
        });
      });
    });

    describe('when invoked with an traveler object', function() {
      it('should invoke #request() with create params', function() {
        var stub = sinon.stub(travelers, 'request');
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

        travelers.create(jonSnow);
        stub.should.have.been.calledWith({
          method: 'POST',
          data: jonSnow
        });
      });
    });

    describe('#fetch()', function() {
      it('should invoke #request() with get params', function() {
        var stub = sinon.stub(travelers, 'request');
        travelers.fetch('travelerId');
        stub.should.have.been.calledWith({
          method: 'GET',
          params: {
            id: 'travelerId'
          },
          path: ':id'
        });
      });
    });
  });
});
