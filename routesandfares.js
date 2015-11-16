'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (key, host) {
  return Object.freeze(new RaF(key, host));
};

var _package = require('./package.json');

var _resources = require('./resources');

var _resources2 = _interopRequireDefault(_resources);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var privateProps = new WeakMap();

var RaF = (function () {
  function RaF() {
    var key = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
    var host = arguments.length <= 1 || arguments[1] === undefined ? 'api.routesandfares.com' : arguments[1];

    _classCallCheck(this, RaF);

    privateProps.set(this, { apiKey: key, host: host });
    for (var r in _resources2.default) {
      this[r] = new _resources2.default[r](privateProps.get(this));
    }
  }

  _createClass(RaF, [{
    key: 'apiKey',
    set: function set(key) {
      privateProps.get(this).apiKey = key;
    }
  }]);

  return RaF;
})();

Object.defineProperty(RaF, 'PACKAGE_VERSION', {
  value: _package.version
});
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _pathToRegexp = require('path-to-regexp');

var _pathToRegexp2 = _interopRequireDefault(_pathToRegexp);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _request2 = require('request');

var _request3 = _interopRequireDefault(_request2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_bluebird2.default.config({
  longStackTraces: true,
  warnings: true
});

var _request = _bluebird2.default.promisify(_request);
var privateProps = new WeakMap();

var APIResource = (function () {
  function APIResource(conf, path) {
    _classCallCheck(this, APIResource);

    privateProps.set(this, { conf: conf });
    this.path = path;
  }

  _createClass(APIResource, [{
    key: 'request',
    value: function request(args) {
      args.method = args.method || 'GET';
      args.path = args.path || '';
      var uncompiledPath = _path2.default.join(this.path, _path2.default);
      var uri = args.params ? _pathToRegexp2.default.compile(uncompiledPath)(args.params) : '';
      var requestOptions = {
        method: args.method,
        baseUrl: this.host,
        uri: uri
      };

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

      return _request(requestOptions);
    }
  }, {
    key: 'host',
    get: function get() {
      return privateProps.get(this).conf.host;
    }
  }]);

  return APIResource;
})();

exports.default = APIResource;
"use strict";
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ApiResource2 = require('./ApiResource');

var _ApiResource3 = _interopRequireDefault(_ApiResource2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Search = (function (_ApiResource) {
  _inherits(Search, _ApiResource);

  function Search(conf) {
    _classCallCheck(this, Search);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Search).call(this, conf, 'search'));
  }

  _createClass(Search, [{
    key: 'query',
    value: function query(terms) {
      this.request({
        method: 'POST',
        data: terms
      });
    }
  }]);

  return Search;
})(_ApiResource3.default);

exports.default = Search;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Search = require('Search');

var _Search2 = _interopRequireDefault(_Search);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Flights  from 'flights';

exports.default = {
  search: _Search2.default
  // flights: Flights
};
//# sourceMappingURL=routesandfares.js.map
