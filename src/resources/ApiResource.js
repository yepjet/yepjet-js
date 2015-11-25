'use strict';

import path     from 'path';
import url      from 'url';
import ptr      from 'path-to-regexp';
import Q        from 'q';
import request  from 'request';
import {WrongParamsError, NetworkError, HTTPError} from './errors';

const privateProps = new WeakMap();

class ApiResource {
  constructor(conf, name) {
    privateProps.set(this, { conf: conf });
    this.name = name;
  }

  get baseUrl() {
    const conf = privateProps.get(this).conf;
    return url.format({
      protocol: 'http',
      host: conf.host,
      pathname: conf.version
    });
  }

  request(args = {}) {
    args.method = args.method || 'GET';
    args.path   = args.path || '';
    let uncompiledPath = path.join(this.name, args.path);
    let uri;

    try {
      uri = ptr.compile(uncompiledPath)(args.params);
    } catch(e) {
      throw new WrongParamsError(e.message);
    }

    let requestOptions = {
      method: args.method,
      baseUrl: this.baseUrl, 
      uri: uri
    };

    let deferred = Q.defer();

    switch(args.method) {
      case 'POST':
      case 'PUT':
        if (args.data) requestOptions.body = JSON.stringify(args.data);
        requestOptions.headers = { 'Content-Type': 'application/json' };
        break;
      case 'GET':
        if (args.data) requestOptions.qs = args.data;
    }

    request(requestOptions, function(err, response, body) {
      try {
        body = JSON.parse(body);
      } catch(e) {}

      if (err) {
        deferred.reject(new NetworkError(err));
      } else if (!/^2\d\d$/.test(response.statusCode)) {
        deferred.reject(new HTTPError(response.statusCode, body));
      } else {
        deferred.resolve(body);
      }
    });

    return deferred.promise;
  }
}

export default ApiResource;
