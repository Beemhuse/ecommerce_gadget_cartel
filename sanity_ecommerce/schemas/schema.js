import createSchema from 'part:@sanity/base/schema-creator';
import schemaTypes from 'all:part:@sanity/base/schema-type';

import product from './product';
// import banner from './banner';
import category from './category';
import order from './order';
// import orderItem from './orderItem';
// import customer from './customer';
import user from './user';
import transaction from './transaction';


export default createSchema({
  name: 'default',
  types: schemaTypes.concat([ product,  category, order, transaction,  user ]),
})
  