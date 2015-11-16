'use strict';

var raf = require('..')('key');
var errors = require('../lib/resources/errors');
var HTTPError = errors.HTTPError;
var Q = require('q');

describe('Search', function() {
  // var params = {"flights": [{"from":"MXP","to":"DEN","departure":"2015-12-12","passengers":[{"category":"ADT"}]}]};
  describe('#query()', function() {
    describe('when there are no params', function() {
      var req = raf.search.query(); 

      it('should return a 400 error', function() {
        return req.should.be.rejectedWith(/400/);
      });

      it('should return a meaningful error message', function() {
        return req.should.be.rejected.then(function(message) {
          return message.should.include.keys('content');
        });
      });
    });

    describe('when there are wrong params', function() {
      var req = raf.search.query({ foo: 'bar' }); 

      it('should return a 400 error', function() {
        return req.should.be.rejectedWith(/400/);
      });

      it('should return a meaningful error message', function() {
        return req.should.be.rejected.then(function(message) {
          return Q.all([
            message.should.have.deep.property('content.error'),
            message.content.message['obj.flights'][0].msg[0].should.equal('error.path.missing')
          ]);
        });
      });
    })
  });
});

