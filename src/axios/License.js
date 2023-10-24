import { CREATE_LICENSE, LICENSE_LIST, MODIFY_LICENSE, DELETE_LICENSE, GET_DETAIL_LICENSE, CUSTOM_LICENSE} from "../constants/api";
import { CONTENT_TYPE } from "../constants/content-type";
import { ACCESS_TOKEN } from "../constants/token";
import request from "./axios";

export const getLicenseList = async () => {
  return request.get(LICENSE_LIST(), {
    headers: {
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
    },
  });
};

export const createLicense = (dto, image) => {
  const formData = new FormData();
  formData.append("image", image);
  formData.append(
    "dto",
    new Blob([JSON.stringify(dto)], { type: CONTENT_TYPE.ApplicationJson })
  );
  return request.post(CREATE_LICENSE(), formData, {
    headers: {
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
      "Content-Type": CONTENT_TYPE.MultipartFormData,
    },
  });
};


export const modifyLicense = (dto, licenseImageId, image ) => {
  const formData = new FormData();
  formData.append("image", image);
  formData.append(
    "dto",
    new Blob([JSON.stringify(dto)], { type: CONTENT_TYPE.ApplicationJson })
  );
  return request.put(MODIFY_LICENSE(licenseImageId), formData, {
    headers: {
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
      "Content-Type": CONTENT_TYPE.MultipartFormData,
    },
  });
}




export const deleteLicense = (id) => {
  return request.delete(DELETE_LICENSE(id), {
    headers: {
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
      "Content-Type": CONTENT_TYPE.MultipartFormData,
    },
  });
};

export const getDetatilLicense = (id) => {
  return request.get(GET_DETAIL_LICENSE(id), {
    headers: {
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
      "Content-Type": CONTENT_TYPE.MultipartFormData,
    },
  });
}


export const addProduct = (data, image) => {
  const formData = new FormData();
  formData.append("image", image);
  formData.append(
    "data",
    new Blob([JSON.stringify(data)], { type: CONTENT_TYPE.ApplicationJson })
  );
  return request.post(CUSTOM_LICENSE(), formData, {
    headers: {
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
      "Content-Type": CONTENT_TYPE.MultipartFormData,
    },
  });
}