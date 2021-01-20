import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICart } from 'app/shared/model/cart.model';
import { getEntities as getCarts } from 'app/entities/cart/cart.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './product.reducer';
import { IProduct } from 'app/shared/model/product.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProductUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProductUpdate = (props: IProductUpdateProps) => {
  const [cartsId, setCartsId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { productEntity, carts, loading, updating } = props;

  const { description } = productEntity;

  const handleClose = () => {
    props.history.push('/product' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getCarts();
  }, []);

  const onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => props.setBlob(name, data, contentType), isAnImage);
  };

  const clearBlob = name => () => {
    props.setBlob(name, undefined, undefined);
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...productEntity,
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
          <h2 id="coffeeApp.product.home.createOrEditLabel">
            <Translate contentKey="coffeeApp.product.home.createOrEditLabel">Create or edit a Product</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : productEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="product-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="product-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="priceLabel" for="product-price">
                  <Translate contentKey="coffeeApp.product.price">Price</Translate>
                </Label>
                <AvField id="product-price" type="string" className="form-control" name="price" />
              </AvGroup>
              <AvGroup>
                <Label id="titleLabel" for="product-title">
                  <Translate contentKey="coffeeApp.product.title">Title</Translate>
                </Label>
                <AvField id="product-title" type="text" name="title" />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="product-description">
                  <Translate contentKey="coffeeApp.product.description">Description</Translate>
                </Label>
                <AvInput id="product-description" type="textarea" name="description" />
              </AvGroup>
              <AvGroup>
                <Label id="imageUrlLabel" for="product-imageUrl">
                  <Translate contentKey="coffeeApp.product.imageUrl">Image Url</Translate>
                </Label>
                <AvField id="product-imageUrl" type="text" name="imageUrl" />
              </AvGroup>
              <AvGroup>
                <Label id="countLabel" for="product-count">
                  <Translate contentKey="coffeeApp.product.count">Count</Translate>
                </Label>
                <AvField id="product-count" type="string" className="form-control" name="count" />
              </AvGroup>
              <AvGroup>
                <Label for="product-carts">
                  <Translate contentKey="coffeeApp.product.carts">Carts</Translate>
                </Label>
                <AvInput id="product-carts" type="select" className="form-control" name="carts.id">
                  <option value="" key="0" />
                  {carts
                    ? carts.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/product" replace color="info">
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
  carts: storeState.cart.entities,
  productEntity: storeState.product.entity,
  loading: storeState.product.loading,
  updating: storeState.product.updating,
  updateSuccess: storeState.product.updateSuccess,
});

const mapDispatchToProps = {
  getCarts,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProductUpdate);
