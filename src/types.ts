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

export type AuthPayload = {
  accessToken: string;
  refreshToken: string;
};

export type JwtPayload = {
  id: string;
  email: string;
  type: UserTypeEnum;
  address?: string;
};

export type User = {
  id: string;
  email: string;
  companyName: string;
  address: string;
  type: UserTypeEnum;
  orders?: Order[];
};

export type LoginDto = {
  email: string;
  password: string;
};

export type RegisterDto = {
  email: string;
  password: string;
  companyName: string;
  address?: string;
  type: UserTypeEnum;
};

export type CreateOrderDto = {
  id: number;
  from: string;
  to: string;
  pickupAddress: string;
  quantity: number;
  transporterId?: string;
};
