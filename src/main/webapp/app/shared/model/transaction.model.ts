import { IOrder } from 'app/shared/model/order.model';
import { Status } from 'app/shared/model/enumerations/status.model';

export interface ITransaction {
  id?: number;
  status?: Status;
  bankError?: string;
  receiptNumber?: string;
  description?: string;
  stan?: string;
  order?: IOrder;
}

export const defaultValue: Readonly<ITransaction> = {};
