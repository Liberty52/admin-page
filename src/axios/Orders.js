
import axios from './axios';
import {ACCESS_TOKEN} from "../constants/token";
import request from "./axios";
import {
  CANCELED_ORDERS,
  CANCELED_ORDER_DETAILS,
  APPROVE_CANCEL,
  POST_NEW_VBANK,
  GET_VBANKS,
  PUT_VBANK,
  DELETE_VBANK,
  GET_DEFAULT_DELIVERY_FEE,
  PATCH_DEFAULT_DELIVERY_FEE,
} from "../constants/api";

export const fetchOrders = async (page, size) => {
  try {
    const response = await axios.get(
      `/admin/orders?page=${page}&size=${size}`,
      {
        headers: {
          Authorization: sessionStorage.getItem(ACCESS_TOKEN),
        },
      }
    );

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
        Authorization: sessionStorage.getItem(ACCESS_TOKEN),
      },
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

export const getCanceledOrders = async (size, page, type) => {
  return axios.get(CANCELED_ORDERS(size, page, type), {
    headers: {
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
    },
  });
};

export const getCanceledOrderDetails = async (orderId) => {
  return axios.get(CANCELED_ORDER_DETAILS(orderId), {
    headers: {
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
    },
  });
};

export const approveCancel = async (dto) => {
  return axios.post(APPROVE_CANCEL(), JSON.stringify(dto), {
    headers: {
      "Content-Type": `application/json`,
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
    },
  });
};


export const postCreateNewVBank = async (dto) => {
  return axios.post(POST_NEW_VBANK(), JSON.stringify(dto), {
    headers: {
      "Content-Type": 'application/json',
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
    }
  });
}

export const getVBanks = async () => {
  return axios.get(GET_VBANKS(), {
    headers: {
      "Content-Type": 'application/json',
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
    }
  });
}

export const putVBank = async (vbankId, dto) => {
  return axios.put(PUT_VBANK(vbankId), JSON.stringify(dto), {
    headers: {
      "Content-Type": 'application/json',
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
    }
  });
}

export const deleteVBank = async (vbankId) => {
  return axios.delete(DELETE_VBANK(vbankId), {
    headers: {
      "Content-Type": 'application/json',
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
    }
  });
}

export const getDefaultDeliveryFee = async () => {
  return axios.get(GET_DEFAULT_DELIVERY_FEE(), {
    headers: {
      "Content-Type": 'application/json',
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
    }
  });
}

export const patchDefaultDeliveryFee = async (dto) => {
  return axios.patch(PATCH_DEFAULT_DELIVERY_FEE(), JSON.stringify(dto), {
    headers: {
      "Content-Type": 'application/json',
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
    }
  });
}

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
    console.log(orderId)
    console.log('Input values:', depositorBank, depositorName, depositorAccount);

    if (response.status === 200) {
      console.log('200');
    } else if (response.status === 400) {
      console.log('400');
      console.log(response.data);
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

