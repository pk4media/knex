
// AWS Redshift
// -------
import { assign } from 'lodash';
import inherits from 'inherits';
import Client_PG from '../postgres';
import QueryCompiler from './query/compiler';
import ColumnCompiler from './schema/columncompiler';
import TableCompiler from './schema/tablecompiler';
import SchemaCompiler from './schema/compiler';

function Client_Redshift() {
  Client_PG.apply(this, arguments);
}
inherits(Client_Redshift, Client_PG);

assign(Client_Redshift.prototype, {

  queryCompiler() {
    return new QueryCompiler(this, ...arguments)
  },

  columnCompiler() {
    return new ColumnCompiler(this, ...arguments)
  },

  schemaCompiler() {
    return new SchemaCompiler(this, ...arguments)
  },

  tableCompiler() {
    return new TableCompiler(this, ...arguments)
  },

  driverName: 'redshift',

});

export default Client_Redshift;
