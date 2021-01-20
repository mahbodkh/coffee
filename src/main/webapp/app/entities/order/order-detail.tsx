import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './order.reducer';
import { IOrder } from 'app/shared/model/order.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IOrderDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const OrderDetail = (props: IOrderDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { orderEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="coffeeApp.order.detail.title">Order</Translate> [<b>{orderEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="address">
              <Translate contentKey="coffeeApp.order.address">Address</Translate>
            </span>
          </dt>
          <dd>{orderEntity.address}</dd>
          <dt>
            <span id="postalCode">
              <Translate contentKey="coffeeApp.order.postalCode">Postal Code</Translate>
            </span>
          </dt>
          <dd>{orderEntity.postalCode}</dd>
          <dt>
            <span id="telePhone">
              <Translate contentKey="coffeeApp.order.telePhone">Tele Phone</Translate>
            </span>
          </dt>
          <dd>{orderEntity.telePhone}</dd>
          <dt>
            <span id="longitude">
              <Translate contentKey="coffeeApp.order.longitude">Longitude</Translate>
            </span>
          </dt>
          <dd>{orderEntity.longitude}</dd>
          <dt>
            <span id="latitude">
              <Translate contentKey="coffeeApp.order.latitude">Latitude</Translate>
            </span>
          </dt>
          <dd>{orderEntity.latitude}</dd>
        </dl>
        <Button tag={Link} to="/order" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/order/${orderEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ order }: IRootState) => ({
  orderEntity: order.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);
