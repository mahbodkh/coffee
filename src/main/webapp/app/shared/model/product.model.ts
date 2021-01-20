import { IPhoto } from 'app/shared/model/photo.model';
import { ICart } from 'app/shared/model/cart.model';

export interface IProduct {
  id?: number;
  price?: number;
  title?: string;
  description?: any;
  imageUrl?: string;
  count?: number;
  photos?: IPhoto[];
  carts?: ICart;
}

export const defaultValue: Readonly<IProduct> = {};
