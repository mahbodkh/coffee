import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IProduct } from 'app/shared/model/product.model';
import { getEntities as getProducts } from 'app/entities/product/product.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './photo.reducer';
import { IPhoto } from 'app/shared/model/photo.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPhotoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PhotoUpdate = (props: IPhotoUpdateProps) => {
  const [photosId, setPhotosId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { photoEntity, products, loading, updating } = props;

  const { image, imageContentType } = photoEntity;

  const handleClose = () => {
    props.history.push('/photo');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getProducts();
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
        ...photoEntity,
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
          <h2 id="coffeeApp.photo.home.createOrEditLabel">
            <Translate contentKey="coffeeApp.photo.home.createOrEditLabel">Create or edit a Photo</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : photoEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="photo-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="photo-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <AvGroup>
                  <Label id="imageLabel" for="image">
                    <Translate contentKey="coffeeApp.photo.image">Image</Translate>
                  </Label>
                  <br />
                  {image ? (
                    <div>
                      {imageContentType ? (
                        <a onClick={openFile(imageContentType, image)}>
                          <img src={`data:${imageContentType};base64,${image}`} style={{ maxHeight: '100px' }} />
                        </a>
                      ) : null}
                      <br />
                      <Row>
                        <Col md="11">
                          <span>
                            {imageContentType}, {byteSize(image)}
                          </span>
                        </Col>
                        <Col md="1">
                          <Button color="danger" onClick={clearBlob('image')}>
                            <FontAwesomeIcon icon="times-circle" />
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ) : null}
                  <input id="file_image" type="file" onChange={onBlobChange(true, 'image')} accept="image/*" />
                  <AvInput type="hidden" name="image" value={image} />
                </AvGroup>
              </AvGroup>
              <AvGroup>
                <Label id="imageUrlLabel" for="photo-imageUrl">
                  <Translate contentKey="coffeeApp.photo.imageUrl">Image Url</Translate>
                </Label>
                <AvField id="photo-imageUrl" type="text" name="imageUrl" />
              </AvGroup>
              <AvGroup>
                <Label id="nameLabel" for="photo-name">
                  <Translate contentKey="coffeeApp.photo.name">Name</Translate>
                </Label>
                <AvField id="photo-name" type="text" name="name" />
              </AvGroup>
              <AvGroup>
                <Label id="heightLabel" for="photo-height">
                  <Translate contentKey="coffeeApp.photo.height">Height</Translate>
                </Label>
                <AvField id="photo-height" type="string" className="form-control" name="height" />
              </AvGroup>
              <AvGroup>
                <Label id="weightLabel" for="photo-weight">
                  <Translate contentKey="coffeeApp.photo.weight">Weight</Translate>
                </Label>
                <AvField id="photo-weight" type="string" className="form-control" name="weight" />
              </AvGroup>
              <AvGroup>
                <Label id="sizeLabel" for="photo-size">
                  <Translate contentKey="coffeeApp.photo.size">Size</Translate>
                </Label>
                <AvField id="photo-size" type="string" className="form-control" name="size" />
              </AvGroup>
              <AvGroup>
                <Label for="photo-photos">
                  <Translate contentKey="coffeeApp.photo.photos">Photos</Translate>
                </Label>
                <AvInput id="photo-photos" type="select" className="form-control" name="photos.id">
                  <option value="" key="0" />
                  {products
                    ? products.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/photo" replace color="info">
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
  products: storeState.product.entities,
  photoEntity: storeState.photo.entity,
  loading: storeState.photo.loading,
  updating: storeState.photo.updating,
  updateSuccess: storeState.photo.updateSuccess,
});

const mapDispatchToProps = {
  getProducts,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PhotoUpdate);
