'use strict';

import {version}  from '../package.json';
import Search     from './resources/Search';
import Flights    from './resources/Flights';
import Orders     from './resources/Orders';
import Travelers  from './resources/Travelers';
import Bookings   from './resources/Bookings';

const privateProps = new WeakMap();

class YepJet {
  constructor(key = null, host = 'sandbox.yepjet.com', apiVersion = 'v1') {
    privateProps.set(this, { apiKey: key, host: host, version: apiVersion }); 
    let props       = privateProps.get(this);
    this.search     = Object.freeze(new Search(props));
    this.flights    = Object.freeze(new Flights(props));
    this.orders     = Object.freeze(new Orders(props));
    this.travelers  = Object.freeze(new Travelers(props));
    this.bookings   = Object.freeze(new Bookings(props));
  }

  set apiKey(key) {
    privateProps.get(this).apiKey = key;
  }
}

module.exports = exports = function(key, host, apiVersion) {
  var client = new YepJet(key, host, apiVersion);

  Object.defineProperty(client, 'PACKAGE_VERSION', {
    value: version
  });

  return Object.freeze(client);
}
