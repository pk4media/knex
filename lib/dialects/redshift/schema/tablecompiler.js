'use strict';

// AWS Redshift
// -------

var inherits = require('inherits');
var TableCompiler_PG = require('../../postgres/schema/tablecompiler');
var has = require('lodash/object/has');

function TableCompiler_Redshift() {
  TableCompiler_PG.apply(this, arguments);
}
inherits(TableCompiler_Redshift, TableCompiler_PG);

// Adds the "create" query to the query sequence.
TableCompiler_Redshift.prototype.createQuery = function (columns, ifNot) {
  var createStatement = ifNot ? 'create table if not exists' : 'create table';
  var sql = createStatement + ' ' + this.tableName() + ' (' + columns.sql.join(', ') + ')';

  var diststyle = this.single.diststyle;
  var sortkey = this.single.sortkey;

  if (diststyle) sql += ' ' + diststyle;
  if (sortkey) sql += ' ' + sortkey;

  this.pushQuery({
    sql: sql,
    bindings: columns.bindings
  });

  var hasComment = has(this.single, 'comment');
  if (hasComment) this.comment(this.single.comment);
};

module.exports = TableCompiler_Redshift;