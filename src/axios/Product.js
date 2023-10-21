import request from './axios';
import {
  ADD_PRODUCT_OPTION,
  ADD_PRODUCT_OPTION_DETAIL,
  ADD_PRODUCT_INTRODUCTION,
  CHANGE_PRODUCT_ON_SALE,
  CHANGE_PRODUCT_OPTION_DETAIL_ON_SALE,
  PRODUCT_DETAIL,
  PRODUCT_LIST,
  PRODUCT_OPTION_LIST,
  UPDATE_PRODUCT_OPTION,
  UPDATE_PRODUCT_OPTION_DETAIL,
} from '../constants/api';
import { ACCESS_TOKEN } from '../constants/token';

export const retrieveProduct = () => {
  return request.get(PRODUCT_LIST(), {
    headers: {
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
    },
  });
};

export const retrieveProductDetail = (productId) => {
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
      'Content-Type': 'application/json',
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
      'Content-Type': 'application/json',
    },
  });
};

export const addProductIntroduction = (productId, imageFile) => {
  const formData = new FormData();
  formData.append('images', imageFile);
  return request.post(ADD_PRODUCT_INTRODUCTION(productId), formData, {
    headers: {
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const modifyProductIntroduction = (productId, imageFile) => {
  const formData = new FormData();
  formData.append('images', imageFile);
  return request.patch(ADD_PRODUCT_INTRODUCTION(productId), formData, {
    headers: {
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
      'Content-Type': 'multipart/form-data',
    },
  });
};
