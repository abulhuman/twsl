export enum UserTypeEnum {
  MANUFACTURER = 'MANUFACTURER',
  TRANSPORTER = 'TRANSPORTER'
}

export interface Order {
  status: string;
  created_date: string;
  id: string | number;
}

export interface OrderDetail extends Order {
  from: string;
  to: string;
  pickupAddress: string;
  quantity: number;
  price?: number;
  transporter?: User;
}

export type Auth = {
  accessToken: string;
  refreshToken: string;
  user: User;
};

export type User = {
  id: string;
  email: string;
  companyName: string;
  address: string;
  type: UserTypeEnum;
  orders?: Order[];
};
