'use strict';

var Orders  = require('../lib/resources/Orders.js').default;
var sinon   = require('sinon');
var host    = 'www.example.com';
var version = 'v1';

describe('Orders', function() {
  var orders;

  beforeEach(function() {
    orders = new Orders({
      host: host,
      version: version
    });
  });

  describe('name', function() {
    it('should be "orders"', function() {
      orders.name.should.equal('orders');
    });
  });

  describe('#create()', function() {
    describe('when invoked without params', function() {
      it('should invoke #request() with create params', function() {
        var stub = sinon.stub(orders, 'request');
        orders.create();
        stub.should.have.been.calledWith({
          method: 'POST'
        });
      });
    });

    describe('when invoked with an array of flights params', function() {
      it('should invoke #request() with create params', function() {
        var stub = sinon.stub(orders, 'request');
        orders.create(['flightId', { id: 'anotherId' }]);
        stub.should.have.been.calledWith({
          method: 'POST',
          data: {
            flights: [
              { id: 'flightId' },
              { id: 'anotherId' }
            ]
          }
        });
      });
    });
  });

  describe('#addFlight()', function() {
    it('should invoke #request() with orders params', function() {
      var stub = sinon.stub(orders, 'request');
      orders.addFlight('oid', 'fid');
      stub.should.have.been.calledWith({
        method: 'PUT',
        path: ':orderId/flights/:flightId',
        params: {
          orderId: 'oid',
          flightId: 'fid'
        }
      });
    });
  });
});
