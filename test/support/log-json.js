'use strict';

module.exports = function(object) {
  process.stdout.write(JSON.stringify(object, null, '\t'));
};
