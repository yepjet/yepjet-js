'use strict';

var yepjet    = require('../..')('key');
var HTTPError = require('../../lib/resources/errors').HTTPError;
var Q         = require('q');
var moment    = require('moment');
var logJSON = require('../support/log-json.js');
var inspect      = require('util').inspect;
var fs          = require('fs');

describe('The order and booking process', function() {
  var order;

  describe('Orders', function() {
    describe('#create()', function() {
      var req;

      before(function() {
        req = yepjet.orders.create();
      });

      it('should work', function() {
        return req.should.be.fulfilled.then(function(order) {
          console.log(order);
        }, function(err) {
          console.log(err);
        });
      });
    });
  });
});

