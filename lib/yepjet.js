'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _package = require('../package.json');

var _Search = require('./resources/Search');

var _Search2 = _interopRequireDefault(_Search);

var _Flights = require('./resources/Flights');

var _Flights2 = _interopRequireDefault(_Flights);

var _Orders = require('./resources/Orders');

var _Orders2 = _interopRequireDefault(_Orders);

var _Bookings = require('./resources/Bookings');

var _Bookings2 = _interopRequireDefault(_Bookings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var privateProps = new WeakMap();

var YepJet = (function () {
  function YepJet() {
    var key = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
    var host = arguments.length <= 1 || arguments[1] === undefined ? 'localhost:9000' : arguments[1];
    var apiVersion = arguments.length <= 2 || arguments[2] === undefined ? 'v1' : arguments[2];

    _classCallCheck(this, YepJet);

    privateProps.set(this, { apiKey: key, host: host, version: apiVersion });
    var props = privateProps.get(this);
    this.search = Object.freeze(new _Search2.default(props));
    this.flights = Object.freeze(new _Flights2.default(props));
    this.orders = Object.freeze(new _Orders2.default(props));
    this.bookings = Object.freeze(new _Bookings2.default(props));
  }

  _createClass(YepJet, [{
    key: 'apiKey',
    set: function set(key) {
      privateProps.get(this).apiKey = key;
    }
  }]);

  return YepJet;
})();

module.exports = exports = function (key, host, apiVersion) {
  var client = new YepJet(key, host, apiVersion);

  Object.defineProperty(client, 'PACKAGE_VERSION', {
    value: _package.version
  });

  return Object.freeze(client);
};
//# sourceMappingURL=yepjet.js.map
