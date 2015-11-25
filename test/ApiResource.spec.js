'use strict';

var sinon       = require('sinon');
var proxyquire  = require('proxyquire').noPreserveCache();
var request     = sinon.stub().yields(null, { statusCode: 200 }, JSON.stringify({ success: true }));
var ApiResource = proxyquire('../lib/resources/ApiResource.js', { request: request }).default;
var host        = 'www.example.com';
var version     = 'v1';
var name        = 'stuff';
var URL_REGEXP  = /^[A-Za-z][A-Za-z\d.+-]*:\/*(?:\w+(?::\w+)?@)?[^\s/]+(?::\d+)?(?:\/[\w#!:.?+=&%@\-/]*)?$/;

function curry(fn) {
  var args = Array.prototype.slice.call(arguments, 1);
  return function() {
    return fn.apply(this, args.concat(
      Array.prototype.slice.call(arguments, 0)
    ));
  };
}

describe('ApiResource', function() {
  var resource;

  beforeEach(function() {
    resource = new ApiResource({
      host: host,
      version: version
    }, name);
  });

  describe('baseUrl', function() {
    it('returns the resource base url', function() {
      resource.baseUrl.should.equal('https://' + host + '/' + version);
    });

    it('returns a valid URL', function() {
      resource.baseUrl.should.match(URL_REGEXP);
    });
  });

  describe('#request()', function() {
    it('should return a promise', function()  {
      resource.request().should.respondTo('then');
    });

    describe('when the params are wrong', function() {
      it('should throw a WrongParamsError', function() {
        curry(resource.request.bind(resource), {
          path: ':id',
          params: { wrong: 'param' }
        }).should.throw(Error);
      });
    });

    describe('a GET request', function() {
      it('should call the right endpoint with query string data', function() {

        var promise = resource.request({
          path: ':id',
          params: {
            id: 1
          },
          data: {
            foo: 'bar'
          }
        });
        
        request.should.be.calledWith({
          baseUrl: resource.baseUrl,
          method: 'GET',
          uri: 'stuff/1',
          qs: { foo: 'bar' }
        });

        return promise.should.be.eventually.deep.equal({ success: true });
      });
    });

    describe('a POST or PUT request', function() {
      ['POST', 'PUT'].forEach(function(method) {
        it('should call the right endpoint with ' + method + ' and json data', function() {
          var promise = resource.request({
            method: method,
            data: {
              foo: 'bar'
            }
          });

          request.should.be.calledWith({
            baseUrl: resource.baseUrl,
            method: method,
            uri: 'stuff',
            json: true,
            body: { foo: 'bar' }
          });

          return promise.should.be.eventually.deep.equal({ success: true });
        });
      });
    });
  });
});
