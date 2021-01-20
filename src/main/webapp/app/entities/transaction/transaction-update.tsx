import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IOrder } from 'app/shared/model/order.model';
import { getEntities as getOrders } from 'app/entities/order/order.reducer';
import { getEntity, updateEntity, createEntity, reset } from './transaction.reducer';
import { ITransaction } from 'app/shared/model/transaction.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITransactionUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TransactionUpdate = (props: ITransactionUpdateProps) => {
  const [orderId, setOrderId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { transactionEntity, orders, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/transaction');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getOrders();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...transactionEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="coffeeApp.transaction.home.createOrEditLabel">
            <Translate contentKey="coffeeApp.transaction.home.createOrEditLabel">Create or edit a Transaction</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : transactionEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="transaction-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="transaction-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="statusLabel" for="transaction-status">
                  <Translate contentKey="coffeeApp.transaction.status">Status</Translate>
                </Label>
                <AvInput
                  id="transaction-status"
                  type="select"
                  className="form-control"
                  name="status"
                  value={(!isNew && transactionEntity.status) || 'SUCCESS'}
                >
                  <option value="SUCCESS">{translate('coffeeApp.Status.SUCCESS')}</option>
                  <option value="VERIFIED">{translate('coffeeApp.Status.VERIFIED')}</option>
                  <option value="FAILED">{translate('coffeeApp.Status.FAILED')}</option>
                  <option value="CREATED">{translate('coffeeApp.Status.CREATED')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="bankErrorLabel" for="transaction-bankError">
                  <Translate contentKey="coffeeApp.transaction.bankError">Bank Error</Translate>
                </Label>
                <AvField id="transaction-bankError" type="text" name="bankError" />
              </AvGroup>
              <AvGroup>
                <Label id="receiptNumberLabel" for="transaction-receiptNumber">
                  <Translate contentKey="coffeeApp.transaction.receiptNumber">Receipt Number</Translate>
                </Label>
                <AvField id="transaction-receiptNumber" type="text" name="receiptNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="transaction-description">
                  <Translate contentKey="coffeeApp.transaction.description">Description</Translate>
                </Label>
                <AvField id="transaction-description" type="text" name="description" />
              </AvGroup>
              <AvGroup>
                <Label id="stanLabel" for="transaction-stan">
                  <Translate contentKey="coffeeApp.transaction.stan">Stan</Translate>
                </Label>
                <AvField id="transaction-stan" type="text" name="stan" />
              </AvGroup>
              <AvGroup>
                <Label for="transaction-order">
                  <Translate contentKey="coffeeApp.transaction.order">Order</Translate>
                </Label>
                <AvInput id="transaction-order" type="select" className="form-control" name="order.id">
                  <option value="" key="0" />
                  {orders
                    ? orders.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/transaction" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  orders: storeState.order.entities,
  transactionEntity: storeState.transaction.entity,
  loading: storeState.transaction.loading,
  updating: storeState.transaction.updating,
  updateSuccess: storeState.transaction.updateSuccess,
});

const mapDispatchToProps = {
  getOrders,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TransactionUpdate);
