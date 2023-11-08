import {
  CREATE_LICENSE,
  LICENSE_LIST,
  MODIFY_LICENSE,
  DELETE_LICENSE,
  GET_DETAIL_LICENSE,
  CUSTOM_LICENSE,
  CREATE_LICENSE_OPTION,
  RETRIEVE_LICENSE_OPTION_LIST,
  CREATE_LICENSE_OPTION_DETAIL,
  MODIFY_LICENSE_OPTION,
  MODIFY_LICENSE_OPTION_DETAIL,
} from '../constants/api';
import { CONTENT_TYPE } from '../constants/content-type';
import { ACCESS_TOKEN } from '../constants/token';
import request from './axios';

export const getLicenseList = async () => {
  return request.get(LICENSE_LIST(), {
    headers: {
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
    },
  });
};

export const createLicense = (dto, image) => {
  const formData = new FormData();
  formData.append('image', image);
  formData.append('dto', new Blob([JSON.stringify(dto)], { type: CONTENT_TYPE.ApplicationJson }));
  return request.post(CREATE_LICENSE(), formData, {
    headers: {
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
      'Content-Type': CONTENT_TYPE.MultipartFormData,
    },
  });
};

export const modifyLicense = (dto, licenseImageId, image) => {
  const formData = new FormData();
  formData.append('image', image);
  formData.append('dto', new Blob([JSON.stringify(dto)], { type: CONTENT_TYPE.ApplicationJson }));
  return request.put(MODIFY_LICENSE(licenseImageId), formData, {
    headers: {
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
      'Content-Type': CONTENT_TYPE.MultipartFormData,
    },
  });
};

export const deleteLicense = (id) => {
  return request.delete(DELETE_LICENSE(id), {
    headers: {
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
      'Content-Type': CONTENT_TYPE.MultipartFormData,
    },
  });
};

export const getDetatilLicense = (id) => {
  return request.get(GET_DETAIL_LICENSE(id), {
    headers: {
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
      'Content-Type': CONTENT_TYPE.MultipartFormData,
    },
  });
};

export const addProduct = (data, image) => {
  const formData = new FormData();
  formData.append('image', image);
  formData.append('data', new Blob([JSON.stringify(data)], { type: CONTENT_TYPE.ApplicationJson }));
  return request.post(CUSTOM_LICENSE(), formData, {
    headers: {
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
      'Content-Type': CONTENT_TYPE.MultipartFormData,
    },
  });
};

export const createLicenseOption = (productId, data) => {
  return request.post(CREATE_LICENSE_OPTION(productId), data, {
    headers: {
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
      'Content-Type': 'application/json',
    },
  });
}

export const modifyLicenseOption = (licenseOptionId, dto) => {
  return request.put(MODIFY_LICENSE_OPTION(licenseOptionId), dto, {
    headers: {
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
    },
  });
};



export const createLicenseOptionDetail = (licenseOptionId, dto, imageFile) => {
  const formData = new FormData();
  formData.append('file', imageFile);
  formData.append('dto', new Blob([JSON.stringify(dto)], { type: CONTENT_TYPE.ApplicationJson }));
  return request.post(CREATE_LICENSE_OPTION_DETAIL(licenseOptionId), formData, {
    headers: {
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
      'Content-Type': CONTENT_TYPE.MultipartFormData,
    },
  });
};


export const modifyLicenseOptionDetail = (licenseOptionDetailId, dto, imageFile) => {
  const formData = new FormData();
  formData.append('file', imageFile);
  formData.append('dto', new Blob([JSON.stringify(dto)], { type: CONTENT_TYPE.ApplicationJson }));
  return request.put(MODIFY_LICENSE_OPTION_DETAIL(licenseOptionDetailId), formData, {
    headers: {
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
      'Content-Type': CONTENT_TYPE.MultipartFormData,
    },
  });
}

export const modifyLicenseOptionOnSaleDetail = () => {

}

export const retrieveLiceneseOptionList =  (productId, onSale) => {
  return request.get(RETRIEVE_LICENSE_OPTION_LIST(productId,onSale), {
    headers: { 
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
    },
  });
};