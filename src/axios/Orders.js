
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

