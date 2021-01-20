export interface IOrder {
  id?: number;
  address?: string;
  postalCode?: string;
  telePhone?: string;
  longitude?: string;
  latitude?: string;
}

export const defaultValue: Readonly<IOrder> = {};
