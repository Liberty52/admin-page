import request from './axios';

export const fetchOrders = async (page, size) => {
  try {
    const response = await request.get(`/admin/orders?page=${page}&size=${size}`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Error: ${response.status}`);
    }
  } catch (error) {
    console.error('Error fetching orders:', error);
    return null;
  }
};
