import axios from "./axios";
import {
  CANCELED_ORDERS,
  CANCELED_ORDER_DETAILS,
  APPROVE_CANCEL, POST_NEW_VBANK, GET_VBANKS, PUT_VBANK, DELETE_VBANK,
} from "../constants/api";
import { ACCESS_TOKEN } from "../constants/token";
import local_axios from "axios";


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
  return local_axios.get('http://localhost:8081/vbanks', {
    headers: {
      "Content-Type": 'application/json',
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
      "LB-Role": "ADMIN"
    }
  });
  // return axios.get(GET_VBANKS, {
  //   headers: {
  //     "Content-Type": 'application/json',
  //     Authorization: sessionStorage.getItem(ACCESS_TOKEN),
  //   }
  // });
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
  return local_axios.delete('http://localhost:8081/admin/vbanks/'+vbankId, {
    headers: {
      "Content-Type": 'application/json',
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
      "LB-Role": "ADMIN"
    }
  });
  // return axios.delete(DELETE_VBANK(vbankId), {
  //   headers: {
  //     "Content-Type": 'application/json',
  //     Authorization: sessionStorage.getItem(ACCESS_TOKEN),
  //   }
  // });
}