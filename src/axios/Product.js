import request from './axios';
import {
  ADD_PRODUCT_OPTION,
  ADD_PRODUCT_OPTION_DETAIL,
  PATCH_PRODUCT_INTRODUCTION,
  DELETE_PRODUCT_INTRODUCTION,
  CHANGE_PRODUCT_ON_SALE,
  CHANGE_PRODUCT_OPTION_DETAIL_ON_SALE,
  PRODUCT_DETAIL,
  PRODUCT_LIST,
  PRODUCT_OPTION_LIST,
  UPDATE_PRODUCT_OPTION,
  UPDATE_PRODUCT_OPTION_DETAIL,
  UPLOAD_PRODUCT_IMAGE,
  GET_DELIVERY_OPTION,
  ADD_DELIVERY_OPTION,
  UPDATE_DELIVERY_OPTION,
  PATCH_PRODUCT,
  DELETE_PRODUCT,
} from '../constants/api';
import { ACCESS_TOKEN } from '../constants/token';
import { CONTENT_TYPE } from '../constants/content-type';

export const retrieveProduct = () => {
  return request.get(PRODUCT_LIST(), {
    headers: {
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
    },
  });
};

export const retrieveProductDetail = async (productId) => {
  return request.get(PRODUCT_DETAIL(productId), {
    headers: {
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
    },
  });
};

export const retrieveProductOptionList = (productId, onSale) => {
  return request.get(PRODUCT_OPTION_LIST(productId, onSale), {
    headers: {
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
    },
  });
};

export const addOptionDetail = (optionId, data) => {
  return request.post(ADD_PRODUCT_OPTION_DETAIL(optionId), data, {
    headers: {
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
    },
  });
};

export const updateOptionDetail = (optionDetailId, data) => {
  return request.put(UPDATE_PRODUCT_OPTION_DETAIL(optionDetailId), data, {
    headers: {
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
    },
  });
};

export const changeOptionDetailOnSale = (optionDetailId) => {
  return request({
    url: CHANGE_PRODUCT_OPTION_DETAIL_ON_SALE(optionDetailId),
    method: 'PUT',
    headers: {
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
      'Content-Type': CONTENT_TYPE.ApplicationJson,
    },
  });
};

export const addProductOption = (productId, data) => {
  return request.post(ADD_PRODUCT_OPTION(productId), data, {
    headers: {
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
    },
  });
};

export const updateProductOption = (optionId, data) => {
  return request.put(UPDATE_PRODUCT_OPTION(optionId), data, {
    headers: {
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
    },
  });
};

export const changeProductOptionOnSale = (optionId) => {
  return request({
    url: CHANGE_PRODUCT_ON_SALE(optionId),
    method: 'PUT',
    headers: {
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
      'Content-Type': CONTENT_TYPE.ApplicationJson,
    },
  });
};

export const patchProductIntroduction = (productId, data) => {
  return request.patch(PATCH_PRODUCT_INTRODUCTION(productId), data, {
    headers: {
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
      'Content-Type': CONTENT_TYPE.ApplicationJson,
    },
  });
};

export const deleteProductIntroduction = (productId) => {
  return request.delete(DELETE_PRODUCT_INTRODUCTION(productId), {
    headers: {
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
    },
  });
};

export const uploadImage = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return request.post(UPLOAD_PRODUCT_IMAGE(), formData, {
    headers: {
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
      'Content-Type': CONTENT_TYPE.MultipartFormData,
    },
  });
};

export const getDeliveryOption = (productId) => {
  return request.get(GET_DELIVERY_OPTION(productId), {
    headers: {
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
    },
  });
};

export const addDeliveryOption = (optionId, data) => {
  return request.post(ADD_DELIVERY_OPTION(optionId), data, {
    headers: {
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
    },
  });
};

export const updateDeliveryOption = (optionId, data) => {
  return request.put(UPDATE_DELIVERY_OPTION(optionId), data, {
    headers: {
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
    },
  });
};
export const patchProduct = (productId, data, image) => {
  const blob = new Blob([JSON.stringify(data)], {
    type: CONTENT_TYPE.ApplicationJson,
  });
  const formData = new FormData();
  formData.append('image', image);
  formData.append('data', blob);
  return request.patch(PATCH_PRODUCT(productId), formData, {
    headers: {
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
      'Content-Type': CONTENT_TYPE.MultipartFormData,
    },
  });
};
export const deleteProduct = (productId) => {
  return request.delete(DELETE_PRODUCT(productId), {
    headers: {
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
    },
  });
};
