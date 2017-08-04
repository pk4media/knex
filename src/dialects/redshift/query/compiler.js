
// AWS Redshift Query Builder & Compiler
// -------

import inherits from 'inherits';
import { assign } from 'lodash'
import QueryCompiler_PG from '../../postgres/query/compiler';
import * as helpers from '../../../helpers';

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

export default QueryCompiler_Redshift;
