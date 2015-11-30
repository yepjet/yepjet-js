'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _pathToRegexp = require('path-to-regexp');

var _pathToRegexp2 = _interopRequireDefault(_pathToRegexp);

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _request2 = require('request');

var _request3 = _interopRequireDefault(_request2);

var _errors = require('./errors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var privateProps = new WeakMap();

var ApiResource = (function () {
  function ApiResource(conf, name) {
    _classCallCheck(this, ApiResource);

    privateProps.set(this, { conf: conf });
    this.name = name;
  }

  _createClass(ApiResource, [{
    key: 'request',
    value: function request() {
      var args = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      args.method = args.method || 'GET';
      args.path = args.path || '';
      var uncompiledPath = _path2.default.join(this.name, args.path);
      var uri = undefined;

      try {
        uri = _pathToRegexp2.default.compile(uncompiledPath)(args.params);
      } catch (e) {
        throw new _errors.WrongParamsError(e.message);
      }

      var requestOptions = {
        method: args.method,
        baseUrl: this.baseUrl,

        headers: {
          'Content-Type': 'application/json'
        },
        uri: uri
      };

      switch (args.method) {
        case 'POST':
        case 'PUT':
          requestOptions.body = JSON.stringify(args.data || {});
          break;
        case 'GET':
          requestOptions.qs = args.data;
      }

      var deferred = _q2.default.defer();

      (0, _request3.default)(requestOptions, function (err, response, body) {
        try {
          body = JSON.parse(body);
        } catch (e) {}

        if (err) {
          deferred.reject(new _errors.NetworkError(err));
        } else if (!/^2\d\d$/.test(response.statusCode)) {
          deferred.reject(new _errors.HTTPError(response.statusCode, body));
        } else {
          deferred.resolve(body);
        }
      });

      return deferred.promise;
    }
  }, {
    key: 'baseUrl',
    get: function get() {
      var conf = privateProps.get(this).conf;
      return _url2.default.format({
        protocol: 'http',
        host: conf.host,
        pathname: conf.version
      });
    }
  }]);

  return ApiResource;
})();

exports.default = ApiResource;
//# sourceMappingURL=ApiResource.js.map
