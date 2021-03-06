'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WrongParamsError = (function (_Error) {
  _inherits(WrongParamsError, _Error);

  function WrongParamsError() {
    var message = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

    _classCallCheck(this, WrongParamsError);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(WrongParamsError).call(this, 'The params are not matching the path: ' + message));

    _this.name = 'WrongParamsError';
    return _this;
  }

  return WrongParamsError;
})(Error);

var NetworkError = (function (_Error2) {
  _inherits(NetworkError, _Error2);

  function NetworkError() {
    var message = arguments.length <= 0 || arguments[0] === undefined ? 'Something wrong with the network' : arguments[0];

    _classCallCheck(this, NetworkError);

    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(NetworkError).call(this, message));

    _this2.name = 'NetworkError';
    return _this2;
  }

  return NetworkError;
})(Error);

var HTTPError = (function (_Error3) {
  _inherits(HTTPError, _Error3);

  function HTTPError() {
    var message = arguments.length <= 0 || arguments[0] === undefined ? 'Something wrong with the HTTP request' : arguments[0];
    var body = arguments[1];

    _classCallCheck(this, HTTPError);

    var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(HTTPError).call(this, message));

    _this3.name = 'HTTPError';
    _this3.body = body;
    return _this3;
  }

  return HTTPError;
})(Error);

exports.WrongParamsError = WrongParamsError;
exports.NetworkError = NetworkError;
exports.HTTPError = HTTPError;
//# sourceMappingURL=errors.js.map
