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

var Flights = (function (_ApiResource) {
  _inherits(Flights, _ApiResource);

  function Flights(conf) {
    _classCallCheck(this, Flights);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Flights).call(this, conf, 'flights'));
  }

  _createClass(Flights, [{
    key: 'fetch',
    value: function fetch(flightId) {
      return this.request({
        method: 'GET',
        params: {
          id: flightId
        }
      });
    }
  }]);

  return Flights;
})(_ApiResource3.default);

exports.default = Flights;
//# sourceMappingURL=Flights.js.map
