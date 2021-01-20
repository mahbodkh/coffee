import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Product from './product';
import Photo from './photo';
import Order from './order';
import Transaction from './transaction';
import Cart from './cart';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}product`} component={Product} />
      <ErrorBoundaryRoute path={`${match.url}photo`} component={Photo} />
      <ErrorBoundaryRoute path={`${match.url}order`} component={Order} />
      <ErrorBoundaryRoute path={`${match.url}transaction`} component={Transaction} />
      <ErrorBoundaryRoute path={`${match.url}cart`} component={Cart} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
