
import axios from './axios';
import {ACCESS_TOKEN} from "../constants/token";
import request from "./axios";

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
  console.log( orderId,depositorBank,
    depositorName,
    depositorAccount);

  try {
    const response = await request.put(`/admin/orders/${orderId}/vbank`, payload, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem(ACCESS_TOKEN)}`
      }
    });

    console.log('Response status:', response.status);

    if (response.status === 200) {
      console.log('200');
    } else if (response.status === 400) {
      console.log('400');
      alert(response.data.message);
    }

  } catch (error) {
    console.error('Error:', error);

  }
}


export async function updateOrderStatus(orderId, orderStatus) {
  try {
    const response = await request.put(`/admin/orders/${orderId}/status`, null, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem(ACCESS_TOKEN)}`
      },
      params: {
        orderStatus
      }
    });

    if (response.status !== 200) {
      console.error('Error:', response.status, response.data);
      if (response.data && response.data.message) {
        console.log(response.data.message);
      } else {
        console.log(response.data.message);
      }
    }
  } catch (error) {
    alert(error.response.data.cause.errorMessage);
  }
}
