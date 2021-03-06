'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ApiResource2 = require('./ApiResource');

var _ApiResource3 = _interopRequireDefault(_ApiResource2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Orders = (function (_ApiResource) {
  _inherits(Orders, _ApiResource);

  function Orders(conf) {
    _classCallCheck(this, Orders);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Orders).call(this, conf, 'orders'));
  }

  _createClass(Orders, [{
    key: 'create',
    value: function create(flights) {
      var req = {
        method: 'POST'
      };

      if (Array.isArray(flights) && flights.length) {
        req.data = { flights: [] };
        flights.forEach(function (flight) {
          if (typeof flight === 'string' || flight instanceof String) {
            req.data.flights.push({ id: flight });
          } else if ((typeof flight === 'undefined' ? 'undefined' : _typeof(flight)) === 'object' && flight.id) {
            req.data.flights.push({ id: flight.id });
          }
        });
      };

      return this.request(req);
    }
  }, {
    key: 'addFlight',
    value: function addFlight(oid, fid) {
      return this.request({
        method: 'PUT',
        path: ':orderId/flights/:flightId',
        params: {
          orderId: oid,
          flightId: fid
        }
      });
    }
  }]);

  return Orders;
})(_ApiResource3.default);

exports.default = Orders;
//# sourceMappingURL=Orders.js.map
