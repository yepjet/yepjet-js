'use strict';

var util = require('util');
var raf = require('..')('key');
var HTTPError = require('../lib/resources/errors').HTTPError;
var Q = require('q');
var _ = require('underscore');
var moment = require('moment');

describe('Search', function() {
  describe('#query()', function() {
    describe('when there are no params', function() {
      var req = raf.search.query(); 

      it('should return a 400 error', function() {
        return req.should.be.rejectedWith(/415/);
      });

      it('should return a meaningful error message', function() {
        return req.should.be.rejected.then(function(message) {
          return message.content.should.include.keys('error');
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
      var tests = [
        {
          params: {
            flights: [
              { from: 'SFO', to: 'FCO' }
            ]
          },
          missing: 'passengers'
        },
        {
          params: {
            flights: [
              { from: 'SFO', passengers: ['ADT'] }
            ]
          },
          missing: 'to'
        },
        {
          params: {
            flights: [
              { to: 'SFO', passengers: ['ADT'] }
            ]
          },
          missing: 'from'
        }
      ];

      tests.forEach(function(test) {
        var req = raf.search.query(test.params); 

        it('should return a 400 error', function() {
          return req.should.be.rejectedWith(/400/);
        });

        it('should complain that "' + test.missing + '" is missing', function() {
          return req.should.be.rejected.then(function(message) {
            return Q.all([
              message.should.have.deep.property('content.error'),
              message.content.message['obj.flights[0].' + test.missing][0].msg[0].should.equal('error.path.missing')
            ]);
          });
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

    describe('when the destination or the arrival doesn\'t exist', function() {
      var tests = [
        {
          from: 'ZZZ',
          to: 'JFK'
        },
        {
          from: 'LHR',
          to: 'XXX'
        },
        {
          from: 'ZZZ',
          to: 'XXX'
        }
      ];

      tests.forEach(function(test) {
        var req = raf.search.query({ flights: [
          _.extend({
            departure: new Date(), 
            passengers: [{ category: 'ADT' }]
          }, test)
        ]}); 

        it('should not return any flight', function() {
          return req.should.eventually.deep.equal({flights: []});
        });
      });
    });

    describe('when the origin and the destination exist', function() {
      var tests = [
        [
          {
            from: 'MXP',
            to: 'FCO',
            departure: moment().toDate(),
            passengers: [{ category: 'ADT' }]
          },
          {
            from: 'FCO',
            to: 'MXP',
            departure: moment().add(2, 'days').toDate(),
            passengers: [{ category: 'ADT' }, { category: 'BUD' }]
          }
        ],
        [
          {
            from: 'SFO',
            to: 'PMO',
            departure: moment().toDate(),
            passengers: [{ category: 'C07' }, { category: 'C07' }] // note, these two guys are children alone
          },
          {
            from: 'PMO',
            to: 'FCO',
            departure: moment().add(2, 'days').toDate(),
            passengers: [{ category: 'ADT' }, { category: 'C07' }] 
          },
          {
            from: 'FCO',
            to: 'SFO',
            departure: moment().add(6, 'days').toDate(),
            passengers: [{ category: 'ADT' }]
          }
        ],
        [
          {
            from: 'LMP',
            to: 'NRT',
            departure: moment().toDate(),
            passengers: [{ category: 'ADT' }]
          },
          {
            from: 'NRT',
            to: 'SFO',
            departure: moment().add(2, 'days').toDate(),
            passengers: [{ category: 'ADT' }]
          },
          {
            from: 'SFO',
            to: 'JFK',
            departure: moment().toDate(), // i'm evil
            passengers: [{ category: 'ADT' }]
          }
        ]
      ];

      tests.forEach(function(test) {
        var req = raf.search.query({ flights: test }); 

        it('should work', function() {
          return req.should.be.fulfilled;
        });
      });
    });
  });
});

