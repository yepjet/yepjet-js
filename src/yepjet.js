'use strict';

import {version}  from '../package.json';
import Search     from './resources/Search';
import Flights    from './resources/Flights';
import Orders     from './resources/Orders';

const privateProps = new WeakMap();

class YepJet {
  constructor(key = null, host = 'localhost:9000', apiVersion = 'v1') {
    privateProps.set(this, { apiKey: key, host: host, version: apiVersion }); 
    this.search  = Object.freeze(new Search(privateProps.get(this)));
    this.flights = Object.freeze(new Flights(privateProps.get(this)));
    this.orders  = Object.freeze(new Orders(privateProps.get(this)));
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
