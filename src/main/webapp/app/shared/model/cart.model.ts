import { IProduct } from 'app/shared/model/product.model';

export interface ICart {
  id?: number;
  quantity?: number;
  price?: number;
  products?: IProduct[];
}

export const defaultValue: Readonly<ICart> = {};
