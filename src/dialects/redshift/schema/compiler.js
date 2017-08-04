// AWS Redshift Schema Compiler
// -------


import inherits from 'inherits';
import SchemaCompiler_PG from '../../postgres/schema/compiler';

function SchemaCompiler_Redshift() {
  SchemaCompiler_PG.apply(this, arguments);
}
inherits(SchemaCompiler_Redshift, SchemaCompiler_PG);

SchemaCompiler_Redshift.prototype.hasTable = function (tableName) {
  let sql = 'select * from information_schema.tables where table_name = ?';
  const bindings = [tableName];

  if (this.schema) {
    sql += ' and table_schema = ?';
    bindings.push(this.schema);
  } else {
    sql += ' and table_schema = current_schema()';
  }

  this.pushQuery({
    sql,
    bindings,
    output(resp) {
      return resp.rows.length > 0;
    }
  });
};

// Compile the query to determine if a column exists in a table.
SchemaCompiler_Redshift.prototype.hasColumn = function (tableName, columnName) {
  var sql = 'select * from information_schema.columns where table_name = ? and column_name = ?';
  var bindings = [tableName, columnName];

  if (this.schema) {
    sql += ' and table_schema = ?';
    bindings.push(this.schema);
  } else {
    sql += ' and table_schema = current_schema()';
  }

  this.pushQuery({
    sql: sql,
    bindings: bindings,
    output: function output(resp) {
      return resp.rows.length > 0;
    }
  });
};

export default SchemaCompiler_Redshift;
