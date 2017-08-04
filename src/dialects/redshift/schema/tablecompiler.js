// AWS Redshift
// -------

import inherits from 'inherits';
import { has } from 'lodash';
import TableCompiler_PG from '../../postgres/schema/tablecompiler';

function TableCompiler_Redshift() {
  TableCompiler_PG.apply(this, arguments);
}
inherits(TableCompiler_Redshift, TableCompiler_PG);

// Adds the "create" query to the query sequence.
TableCompiler_Redshift.prototype.createQuery = function (columns, ifNot) {
  const createStatement = ifNot ? 'create table if not exists' : 'create table';
  let sql = createStatement + ' ' + this.tableName() + ' (' + columns.sql.join(', ') + ')';

  const diststyle = this.single.diststyle;
  const sortkey = this.single.sortkey;

  if (diststyle) sql += '\n' + diststyle;
  if (sortkey) sql += '\n' + sortkey;

  this.pushQuery({
    sql,
    bindings: columns.bindings
  });

  const hasComment = has(this.single, 'comment');
  if (hasComment) this.comment(this.single.comment);
};

export default TableCompiler_Redshift;
