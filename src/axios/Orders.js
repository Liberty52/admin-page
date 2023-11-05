import axios from './axios';
import { ACCESS_TOKEN } from '../constants/token';
import { CONTENT_TYPE } from '../constants/content-type';
import request from './axios';
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
  UPSCALE_IMAGE,
  CHANGE_ORDER_STATUS,
  DELIVERY_COMPANY_LIST,
  CREATE_TRACKING_INFO,
  GET_REDIRECT_URL_OF_ORDER_DELIEVERY
} from '../constants/api';

export const fetchOrders = async (page, size) => {
  try {
    const response = await axios.get(`/admin/orders?page=${page}&size=${size}`, {
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
      'Content-Type': CONTENT_TYPE.ApplicationJson,
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
    },
  });
};

export const postCreateNewVBank = async (dto) => {
  return axios.post(POST_NEW_VBANK(), JSON.stringify(dto), {
    headers: {
      'Content-Type': CONTENT_TYPE.ApplicationJson,
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
    },
  });
};

export const getVBanks = async () => {
  return axios.get(GET_VBANKS(), {
    headers: {
      'Content-Type': CONTENT_TYPE.ApplicationJson,
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
    },
  });
};

export const putVBank = async (vbankId, dto) => {
  return axios.put(PUT_VBANK(vbankId), JSON.stringify(dto), {
    headers: {
      'Content-Type': CONTENT_TYPE.ApplicationJson,
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
    },
  });
};

export const deleteVBank = async (vbankId) => {
  return axios.delete(DELETE_VBANK(vbankId), {
    headers: {
      'Content-Type': CONTENT_TYPE.ApplicationJson,
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
    },
  });
};

export const getDefaultDeliveryFee = async () => {
  return axios.get(GET_DEFAULT_DELIVERY_FEE(), {
    headers: {
      'Content-Type': CONTENT_TYPE.ApplicationJson,
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
    },
  });
};

export const patchDefaultDeliveryFee = async (dto) => {
  return axios.patch(PATCH_DEFAULT_DELIVERY_FEE(), JSON.stringify(dto), {
    headers: {
      'Content-Type': CONTENT_TYPE.ApplicationJson,
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
    },
  });
};

export async function updateOrder(orderId, depositorBank, depositorName, depositorAccount) {
  const payload = {
    depositorBank,
    depositorName,
    depositorAccount,
  };

  try {
    const response = await request.put(`/admin/orders/${orderId}/vbank`, payload, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem(ACCESS_TOKEN)}`,
      },
    });
  } catch (error) {
    alert('error: ' + error.response.data.errorMessage);
  }
}

export async function updateOrderStatus(orderId, orderStatus) {
  return request.put(CHANGE_ORDER_STATUS(orderId), null, {
    headers: {
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
    },
    params: {
      orderStatus,
    },
  });
}

export const upscaleImage = (url, scale) => {
  const dto = { url, scale };
  return request.post(UPSCALE_IMAGE(), JSON.stringify(dto), {
    headers: {
      'Content-Type': CONTENT_TYPE.ApplicationJson,
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
    },
  });
};

// 송장 관련
export const getDeliveryCompanies = async (international) => {
  return request.get(DELIVERY_COMPANY_LIST(international), {
    headers: { Authorization: sessionStorage.getItem(ACCESS_TOKEN) },
  });
};

export const createTrackingInfo = (orderId, dto) => {
  return request.post(CREATE_TRACKING_INFO(orderId), dto, {
    headers: { Authorization: sessionStorage.getItem(ACCESS_TOKEN) },
  });
};

export function fetchRealTimeDeliveryInfo(order, popup) {
  const orderId = order.orderId;
  const orderDelivery = order.orderDelivery;
  const courierCode = orderDelivery.code;
  const trackingNumber = orderDelivery.trackingNumber;

  const getAccessToken = () => {
    return sessionStorage.getItem("ACCESS_TOKEN");
  }

  const fetchOrderDelivery = (accessToken, orderId) => {
      axios.get(GET_REDIRECT_URL_OF_ORDER_DELIEVERY(orderId, courierCode, trackingNumber), {
        headers: {
          Authorization: `${accessToken}`,
        },
      })
      .then(response => {
        if (response.status === 200 || response.status === 302) {
          if (!popup) {
            alert("팝업 차단을 해제해주세요")
          } else {
            popup.location.href = response.request?.responseURL;
          }
        }
         else {
          const data = response.json();
          data.then((res => {alert(res.errorName)}));
        }
      })
      .catch(error => {
        console.error(error);
        popup.close();
        alert(error.response.data.errorMessage);
      });
  }

  const accessToken = getAccessToken()
  if (accessToken) {
    fetchOrderDelivery(accessToken, orderId);
  } else {
    alert('인증토큰이 없습니다. 다시 로그인해주세요')
  }
}
