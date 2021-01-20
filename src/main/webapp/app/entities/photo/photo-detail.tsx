import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './photo.reducer';
import { IPhoto } from 'app/shared/model/photo.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPhotoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PhotoDetail = (props: IPhotoDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { photoEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="coffeeApp.photo.detail.title">Photo</Translate> [<b>{photoEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="image">
              <Translate contentKey="coffeeApp.photo.image">Image</Translate>
            </span>
          </dt>
          <dd>
            {photoEntity.image ? (
              <div>
                {photoEntity.imageContentType ? (
                  <a onClick={openFile(photoEntity.imageContentType, photoEntity.image)}>
                    <img src={`data:${photoEntity.imageContentType};base64,${photoEntity.image}`} style={{ maxHeight: '30px' }} />
                  </a>
                ) : null}
                <span>
                  {photoEntity.imageContentType}, {byteSize(photoEntity.image)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="imageUrl">
              <Translate contentKey="coffeeApp.photo.imageUrl">Image Url</Translate>
            </span>
          </dt>
          <dd>{photoEntity.imageUrl}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="coffeeApp.photo.name">Name</Translate>
            </span>
          </dt>
          <dd>{photoEntity.name}</dd>
          <dt>
            <span id="height">
              <Translate contentKey="coffeeApp.photo.height">Height</Translate>
            </span>
          </dt>
          <dd>{photoEntity.height}</dd>
          <dt>
            <span id="weight">
              <Translate contentKey="coffeeApp.photo.weight">Weight</Translate>
            </span>
          </dt>
          <dd>{photoEntity.weight}</dd>
          <dt>
            <span id="size">
              <Translate contentKey="coffeeApp.photo.size">Size</Translate>
            </span>
          </dt>
          <dd>{photoEntity.size}</dd>
          <dt>
            <Translate contentKey="coffeeApp.photo.photos">Photos</Translate>
          </dt>
          <dd>{photoEntity.photos ? photoEntity.photos.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/photo" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/photo/${photoEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ photo }: IRootState) => ({
  photoEntity: photo.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PhotoDetail);
