
// AWS Redshift
// -------
'use strict';

var inherits = require('inherits');
var Client_PG = require('../postgres');
var assign = require('lodash/object/assign');

var QueryCompiler = require('./query/compiler');
var ColumnCompiler = require('./schema/columncompiler');
var TableCompiler = require('./schema/tablecompiler');
var SchemaCompiler = require('./schema/compiler');

function Client_Redshift() {
  Client_PG.apply(this, arguments);
}
inherits(Client_Redshift, Client_PG);

assign(Client_Redshift.prototype, {

  driverName: 'redshift',

  QueryCompiler: QueryCompiler,

  ColumnCompiler: ColumnCompiler,

  SchemaCompiler: SchemaCompiler,

  TableCompiler: TableCompiler

});

module.exports = Client_Redshift;