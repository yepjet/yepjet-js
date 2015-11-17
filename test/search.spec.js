'use strict';

var util = require('util');
var raf = require('..')('key');
var HTTPError = require('../lib/resources/errors').HTTPError;
var Q = require('q');

describe('Search', function() {
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
    });

    describe('when there are missing required params', function() {
      var req = raf.search.query({ flights: [
        { from: 'SFO', departure: new Date() }
      ]}); 

      it('should return a 400 error', function() {
        return req.should.be.rejectedWith(/400/);
      });

      it('should return a meaningful error message', function() {
        return req.should.be.rejected.then(function(message) {
          return Q.all([
            message.should.have.deep.property('content.error'),
            message.content.message['obj.flights[0].passengers'][0].msg[0].should.equal('error.path.missing'),
            message.content.message['obj.flights[0].to'][0].msg[0].should.equal('error.path.missing')

          ]);
        });
      });
    });

    describe('when there are wrong param values', function() {
      var req = raf.search.query({ flights: [
        {
          from: 'JFK',
          to: 'LHR',
          departure: 'random_string_wrong_date', 
          flex: 12,
          sort_by: false, 
          passengers: [{ foo: true }, { category: 'BUD' }, { category: 'LOL' }]
        }
      ]}); 

      it('should return a 400 error', function() {
        return req.should.be.rejectedWith(/400/);
      });

      it('should return a meaningful error message', function() {
        return req.should.be.rejected.then(function(message) {
          // console.log(util.inspect(message, false, null));
          return Q.all([
            message.should.have.deep.property('content.error'),
            message.content.message['obj.flights[0].departure'][0].msg[0].should.equal('error.expected.jsdate'),
            message.content.message['obj.flights[0].flex'][0].msg[0].should.equal('error.expected.jsboolean'),
            message.content.message['obj.flights[0].sort_by'][0].msg[0].should.equal('error.expected.jsstring'),
            message.content.message['obj.flights[0].passengers[0].category'][0].msg[0].should.equal('error.path.missing'),
          ]);
        });
      });
    });

    describe('when the destination and the arrival don\'t exists', function() {
      var req = raf.search.query({ flights: [
        {
          from: 'ZZZ',
          to: 'XXX',
          departure: new Date(), 
          passengers: [{ category: 'ADT' }]
        }
      ]}); 

      it('should not return any flight', function() {
        return req.should.eventually.deep.equal({flights: []});
      });
    })
  });
});

