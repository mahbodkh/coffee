import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './order.reducer';
import { IOrder } from 'app/shared/model/order.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IOrderUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const OrderUpdate = (props: IOrderUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { orderEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/order');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...orderEntity,
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
          <h2 id="coffeeApp.order.home.createOrEditLabel">
            <Translate contentKey="coffeeApp.order.home.createOrEditLabel">Create or edit a Order</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : orderEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="order-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="order-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="addressLabel" for="order-address">
                  <Translate contentKey="coffeeApp.order.address">Address</Translate>
                </Label>
                <AvField id="order-address" type="text" name="address" />
              </AvGroup>
              <AvGroup>
                <Label id="postalCodeLabel" for="order-postalCode">
                  <Translate contentKey="coffeeApp.order.postalCode">Postal Code</Translate>
                </Label>
                <AvField id="order-postalCode" type="text" name="postalCode" />
              </AvGroup>
              <AvGroup>
                <Label id="telePhoneLabel" for="order-telePhone">
                  <Translate contentKey="coffeeApp.order.telePhone">Tele Phone</Translate>
                </Label>
                <AvField id="order-telePhone" type="text" name="telePhone" />
              </AvGroup>
              <AvGroup>
                <Label id="longitudeLabel" for="order-longitude">
                  <Translate contentKey="coffeeApp.order.longitude">Longitude</Translate>
                </Label>
                <AvField id="order-longitude" type="text" name="longitude" />
              </AvGroup>
              <AvGroup>
                <Label id="latitudeLabel" for="order-latitude">
                  <Translate contentKey="coffeeApp.order.latitude">Latitude</Translate>
                </Label>
                <AvField id="order-latitude" type="text" name="latitude" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/order" replace color="info">
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
  orderEntity: storeState.order.entity,
  loading: storeState.order.loading,
  updating: storeState.order.updating,
  updateSuccess: storeState.order.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(OrderUpdate);
