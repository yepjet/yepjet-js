'use strict';

import path     from 'path';
import ptr      from 'path-to-regexp';
import Q        from 'q';
import request  from 'request';

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
    let uri = args.params ? ptr.compile(uncompiledPath)(args.params) : uncompiledPath;
    let requestOptions = {
      method: args.method,
      baseUrl: this.baseUrl, 
      uri: uri
    };

    let deferred = Q.defer();

    switch(args.method) {
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

    request(requestOptions, function(err, response, body) {
      if (err) {
        deferred.reject(err);
      } else if (!/^2\d\d$/.test(response.statusCode)) {
        deferred.reject(body);
      } else {
        deferred.resolve(body);
      }
    });

    return deferred.promise;
  }
}

export default APIResource;
