
// AWS Redshift Query Builder & Compiler
// -------

'use strict';

var inherits = require('inherits');
var QueryCompiler_PG = require('../../postgres/query/compiler');
var assign = require('lodash/object/assign');
var helpers = require('../../../helpers');

function QueryCompiler_Redshift(client, builder) {
  QueryCompiler_PG.call(this, client, builder);
}
inherits(QueryCompiler_Redshift, QueryCompiler_PG);

assign(QueryCompiler_Redshift.prototype, {

  forUpdate: function forUpdate() {
    return '';
  },

  forShare: function forShare() {
    helpers.warn('lock for share is not supported by AWS redshift dialect');
    return '';
  }

});

module.exports = QueryCompiler_Redshift;