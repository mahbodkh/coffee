import { IProduct } from 'app/shared/model/product.model';

export interface IPhoto {
  id?: number;
  imageContentType?: string;
  image?: any;
  imageUrl?: string;
  name?: string;
  height?: number;
  weight?: number;
  size?: number;
  photos?: IProduct;
}

export const defaultValue: Readonly<IPhoto> = {};
