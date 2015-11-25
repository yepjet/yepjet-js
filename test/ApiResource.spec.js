'use strict';

var sinon       = require('sinon');
var proxyquire  = require('proxyquire');
var request     = sinon.stub().yields(null, { statusCode: 200 }, JSON.stringify({ success: true }));
var ApiResource = proxyquire('../lib/resources/ApiResource.js', { request: request }).default;
var host        = 'www.example.com';
var version     = 'v1';
var name        = 'stuff';
var URL_REGEXP  = /^[A-Za-z][A-Za-z\d.+-]*:\/*(?:\w+(?::\w+)?@)?[^\s/]+(?::\d+)?(?:\/[\w#!:.?+=&%@\-/]*)?$/;

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

    describe('a GET request', function() {
      it('should call the right endpoint with query string data', function() {

        var promise = resource.request({
          path: 'path',
          data: {
            foo: 'bar'
          }
        });
        
        request.should.be.calledWith({
          baseUrl: resource.baseUrl,
          method: 'GET',
          uri: 'stuff/path',
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
            path: 'path',
            data: {
              foo: 'bar'
            }
          });

          request.should.be.calledWith({
            baseUrl: resource.baseUrl,
            method: method,
            uri: 'stuff/path',
            json: true,
            body: { foo: 'bar' }
          });

          return promise.should.be.eventually.deep.equal({ success: true });
        });
      });
    });
  });
});
