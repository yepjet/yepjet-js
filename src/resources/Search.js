'use strict';

import ApiResource from './ApiResource';

class Search extends ApiResource {
  constructor(conf) {
    super(conf, 'search');
  }

  query(terms) {
    return this.request({
      method: 'POST',
      data: terms
    });
  }
}

export default Search;
