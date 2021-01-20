import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './product.reducer';
import { IProduct } from 'app/shared/model/product.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProductDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProductDetail = (props: IProductDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { productEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="coffeeApp.product.detail.title">Product</Translate> [<b>{productEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="price">
              <Translate contentKey="coffeeApp.product.price">Price</Translate>
            </span>
          </dt>
          <dd>{productEntity.price}</dd>
          <dt>
            <span id="title">
              <Translate contentKey="coffeeApp.product.title">Title</Translate>
            </span>
          </dt>
          <dd>{productEntity.title}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="coffeeApp.product.description">Description</Translate>
            </span>
          </dt>
          <dd>{productEntity.description}</dd>
          <dt>
            <span id="imageUrl">
              <Translate contentKey="coffeeApp.product.imageUrl">Image Url</Translate>
            </span>
          </dt>
          <dd>{productEntity.imageUrl}</dd>
          <dt>
            <span id="count">
              <Translate contentKey="coffeeApp.product.count">Count</Translate>
            </span>
          </dt>
          <dd>{productEntity.count}</dd>
          <dt>
            <Translate contentKey="coffeeApp.product.carts">Carts</Translate>
          </dt>
          <dd>{productEntity.carts ? productEntity.carts.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/product" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/product/${productEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ product }: IRootState) => ({
  productEntity: product.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
