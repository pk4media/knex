
// AWS Redshift Column Compiler
// -------

var inherits          = require('inherits');
var ColumnCompiler_PG = require('../../postgres/schema/columncompiler');
var assign            = require('lodash/object/assign');

function ColumnCompiler_Redshift() {
  ColumnCompiler_PG.apply(this, arguments);
  this.modifiers = ['nullable', 'defaultTo', 'comment', 'encode']
}
inherits(ColumnCompiler_Redshift, ColumnCompiler_PG);

assign(ColumnCompiler_Redshift.prototype, {
  bigincrements: 'bigint identity(0,1) primary key',
  increments: 'integer identity(0,1) primary key',
  datetime: 'timestamp',
  timestamp: 'timestamp',

  encode: function(encoding) {
    return 'encode ' + encoding;
  }
});

module.exports = ColumnCompiler_Redshift;
