// AWS Redshift Column Compiler
// -------

import inherits from 'inherits';
import { assign } from 'lodash';
import ColumnCompiler_PG from '../../postgres/schema/columncompiler';

function ColumnCompiler_Redshift() {
  ColumnCompiler_PG.apply(this, arguments);
  this.modifiers = ['nullable', 'defaultTo', 'comment', 'encode'];
}
inherits(ColumnCompiler_Redshift, ColumnCompiler_PG);

assign(ColumnCompiler_Redshift.prototype, {
  bigincrements: 'bigint identity(0,1) primary key',
  increments: 'integer identity(0,1) primary key',
  datetime: 'timestamp',
  timestamp: 'timestamp',

  encode(encoding) {
    return 'encode ' + encoding;
  }
});

export default ColumnCompiler_Redshift;
