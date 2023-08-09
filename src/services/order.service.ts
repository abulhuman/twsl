import api from '../config/api.config';
import { getAccessToken } from '../helpers/token.helper';
import {
  CreateOrderDto,
  Order,
  OrderDetail,
  User,
  UserTypeEnum
} from '../types';

export const fetchOrders = async (): Promise<Order[]> => {
  const response = await api.get('/orders', {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`
    }
  });
  return response.data;
};

export const fetchOrderById = async (id: number): Promise<OrderDetail> => {
  console.log('fetchOrderById', id)
  const response = await api.get(`/orders/${id}`, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`
    }
  });
  return response.data;
};

export const fetchLastOrderId = async (): Promise<number> => {
  const response = await api.get('/orders?_sort=id&_order=desc&_limit=1', {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`
    }
  });
  return response.data[0].id;
};

export const fetchTransporters = async (): Promise<User[]> => {
  const response = await api.get(`/users?_type=${UserTypeEnum.TRANSPORTER}`, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`
    }
  });
  return response.data;
};

export const createOrder = async (orderDto: CreateOrderDto) => {
  const response = await api.post<Order>('/orders', orderDto, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAccessToken()}`
    }
  });
  return response.data;
};

export const sendPriceQuote = async (orderId: number, price: number) => {
  const response = await api.patch<OrderDetail>(
    `/orders/${orderId}`,
    { price, status: 'QUOTED' },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAccessToken()}`
      }
    }
  );
  return response.data;
};

