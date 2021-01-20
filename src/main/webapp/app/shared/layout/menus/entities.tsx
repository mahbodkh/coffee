import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.main')}
    id="entity-menu"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <MenuItem icon="asterisk" to="/product">
      <Translate contentKey="global.menu.entities.product" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/photo">
      <Translate contentKey="global.menu.entities.photo" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/order">
      <Translate contentKey="global.menu.entities.order" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/transaction">
      <Translate contentKey="global.menu.entities.transaction" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/cart">
      <Translate contentKey="global.menu.entities.cart" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
