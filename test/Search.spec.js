'use strict';

var Search  = require('../lib/resources/Search.js').default;
var sinon   = require('sinon');
var host    = 'www.example.com';
var version = 'v1';

describe('Search', function() {
  var search;

  beforeEach(function() {
    search = new Search({
      host: host,
      version: version
    });
  });

  describe('name', function() {
    it('should be "search"', function() {
      search.name.should.equal('search');
    });
  });

  describe('#query()', function() {
    it('should invoke #request() with search params', function() {
      var stub = sinon.stub(search, 'request');
      search.query('foo');
      stub.should.have.been.calledWith({
        method: 'POST',
        data: 'foo'
      });
    });
   });
});
