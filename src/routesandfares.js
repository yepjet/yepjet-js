'use strict';

import {version}  from '../package.json';
import Search     from './resources/Search';
import Flights    from './resources/Flights';

const privateProps = new WeakMap();

class RaF {
  constructor(key = null, host = 'http://localhost:9000/', apiVersion = 'v1') {
    privateProps.set(this, { apiKey: key, host: host, version: apiVersion }); 
    this.search  = new Search(privateProps.get(this));
    this.flights = new Flights(privateProps.get(this));
  }

  set apiKey(key) {
    privateProps.get(this).apiKey = key;
  }
}

Object.defineProperty(RaF, 'PACKAGE_VERSION', {
  value: version
});

module.exports = exports = function(key, host, apiVersion) {
  return Object.freeze(new RaF(key, host, apiVersion));
}
