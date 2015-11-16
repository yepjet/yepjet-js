'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _pathToRegexp = require('path-to-regexp');

var _pathToRegexp2 = _interopRequireDefault(_pathToRegexp);

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _request2 = require('request');

var _request3 = _interopRequireDefault(_request2);

var _requestDebug = require('request-debug');

var _requestDebug2 = _interopRequireDefault(_requestDebug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(0, _requestDebug2.default)(_request3.default);

var privateProps = new WeakMap();

var APIResource = (function () {
  function APIResource(conf, name) {
    _classCallCheck(this, APIResource);

    privateProps.set(this, { conf: conf });
    this.name = name;
  }

  _createClass(APIResource, [{
    key: 'request',
    value: function request(args) {
      args.method = args.method || 'GET';
      args.path = args.path || '';
      var uncompiledPath = _path2.default.join(this.name, args.path);
      var uri = args.params ? _pathToRegexp2.default.compile(uncompiledPath)(args.params) : uncompiledPath;
      var requestOptions = {
        method: args.method,
        baseUrl: this.baseUrl,
        uri: uri
      };

      var deferred = _q2.default.defer();

      switch (args.method) {
        case 'POST':
        case 'PUT':
          if (args.data) {
            requestOptions.json = true;
            requestOptions.body = args.data;
          }
          break;
        case 'GET':
          if (args.data) requestOptions.qs = args.data;
          break;
      }

      (0, _request3.default)(requestOptions, function (err, response, body) {
        if (err) {
          deferred.reject(err);
        } else if (!/^2\d\d$/.test(response.statusCode)) {
          deferred.reject(body);
        } else {
          deferred.resolve(body);
        }
      });

      return deferred.promise;
    }
  }, {
    key: 'baseUrl',
    get: function get() {
      return privateProps.get(this).conf.host + privateProps.get(this).conf.version;
    }
  }]);

  return APIResource;
})();

exports.default = APIResource;
//# sourceMappingURL=ApiResource.js.map
