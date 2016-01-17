
// AWS Redshift
// -------
var inherits       = require('inherits')
var Client_PG      = require('../postgres')
var assign         = require('lodash/object/assign')

var ColumnCompiler = require('./schema/columncompiler')
var TableCompiler  = require('./schema/tablecompiler')
var SchemaCompiler = require('./schema/compiler')

function Client_Redshift(config) {
  Client_PG.call(this, config)
}
inherits(Client_Redshift, Client_PG)

assign(Client_Redshift.prototype, {
  driverName: 'redshift',

  ColumnCompiler: ColumnCompiler,

  SchemaCompiler: SchemaCompiler,

  TableCompiler: TableCompiler
})
