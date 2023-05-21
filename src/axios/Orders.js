
import axios from './axios';
import {ACCESS_TOKEN} from "../constants/token";

export const fetchOrders = async (page, size) => {
  try {
    const response = await axios.get(`/admin/orders?page=${page}&size=${size}`, {
      headers: {
        Authorization: sessionStorage.getItem(ACCESS_TOKEN)
      }
    });

    if (response.status === 200) {
      return response.data;
    } else {
      console.error(`Unexpected response code ${response.status}`);
    }
  } catch (error) {
    if (error.response) {
      console.error(`Error during fetch: ${error.response.status}`);
    }
  }
  return null;
};


export const fetchOrderDetail = async (orderId) => {
  try {
    const response = await axios.get(`/admin/orders/${orderId}`, {
      headers: {
        Authorization: sessionStorage.getItem(ACCESS_TOKEN)
      }
    });

    if (response.status === 200) {
      return response.data;
    } else {
      console.error(`Unexpected response code ${response.status}`);
    }
  } catch (error) {
    if (error.response) {
      console.error(`Error during fetch: ${error.response.status}`);
    }
  }
  return null;
};


export async function updateOrder(orderId, depositorBank, depositorName, depositorAccount) {
  const payload = {
    depositorBank,
    depositorName,
    depositorAccount
  };

  console.log(depositorBank,
    depositorName,
    depositorAccount);

  const response = await axios.put(`/admin/orders/${orderId}/vbank`, payload, {
    headers: {
      'Authorization': 'LB-Role'
    }
  });

  if (response.status === 200) {
    console.log('200');
  } else if (response.status === 400) {
    console.log('400');
  }
}

export async function updateOrderStatus(orderId, orderStatus) {
  try {
    const response = await axios.put(`/admin/orders/${orderId}/status`, null, {
      headers: {
        'Authorization': 'LB-Role'
      },
      params: {
        orderStatus
      }
    });

    if (response.status === 200) {
      console.log('200');
    } else if (response.status === 400) {
      console.log('400');
    }
  } catch (error) {
    console.error('Error updating order status:', error);
  }
}
