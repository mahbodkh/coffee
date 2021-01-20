import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './transaction.reducer';
import { ITransaction } from 'app/shared/model/transaction.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITransactionDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TransactionDetail = (props: ITransactionDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { transactionEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="coffeeApp.transaction.detail.title">Transaction</Translate> [<b>{transactionEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="status">
              <Translate contentKey="coffeeApp.transaction.status">Status</Translate>
            </span>
          </dt>
          <dd>{transactionEntity.status}</dd>
          <dt>
            <span id="bankError">
              <Translate contentKey="coffeeApp.transaction.bankError">Bank Error</Translate>
            </span>
          </dt>
          <dd>{transactionEntity.bankError}</dd>
          <dt>
            <span id="receiptNumber">
              <Translate contentKey="coffeeApp.transaction.receiptNumber">Receipt Number</Translate>
            </span>
          </dt>
          <dd>{transactionEntity.receiptNumber}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="coffeeApp.transaction.description">Description</Translate>
            </span>
          </dt>
          <dd>{transactionEntity.description}</dd>
          <dt>
            <span id="stan">
              <Translate contentKey="coffeeApp.transaction.stan">Stan</Translate>
            </span>
          </dt>
          <dd>{transactionEntity.stan}</dd>
          <dt>
            <Translate contentKey="coffeeApp.transaction.order">Order</Translate>
          </dt>
          <dd>{transactionEntity.order ? transactionEntity.order.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/transaction" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/transaction/${transactionEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ transaction }: IRootState) => ({
  transactionEntity: transaction.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TransactionDetail);
