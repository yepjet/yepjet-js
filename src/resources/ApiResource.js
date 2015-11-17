'use strict';

import path     from 'path';
import ptr      from 'path-to-regexp';
import Q        from 'q';
import request  from 'request';
import {NetworkError, HTTPError} from './errors';

const privateProps = new WeakMap();


class APIResource {
  constructor(conf, name) {
    privateProps.set(this, { conf: conf });
    this.name = name;
  }

  get baseUrl() {
    return privateProps.get(this).conf.host + privateProps.get(this).conf.version;
  }

  request(args) {
    args.method = args.method || 'GET';
    args.path   = args.path || '';
    let uncompiledPath = path.join(this.name, args.path);
    let uri = ptr.compile(uncompiledPath)(args.params || {});
    let requestOptions = {
      method: args.method,
      baseUrl: this.baseUrl, 
      uri: uri
    };

    let deferred = Q.defer();

    switch(args.method) {
      case 'POST':
      case 'PUT':
        requestOptions.json = true;
        requestOptions.body = args.data;
        break;
      case 'GET':
        if (args.data) requestOptions.qs = args.data;
        break;
    }

    request(requestOptions, function(err, response, body) {
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

export default APIResource;
