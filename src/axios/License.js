import { CREATE_LICENSE, LICENSE_LIST } from "../constants/api";
import { ACCESS_TOKEN } from "../constants/token";
import request from "./axios";

export const getLicenseList = async () => {
  return request.get(LICENSE_LIST, {
    headers: {
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
    },
  });
};

export const createLicense = async (dto) => {
  return request.put(
    CREATE_LICENSE,
    { dto },
    {
      headers: {
        Authorization: sessionStorage.getItem(ACCESS_TOKEN),
      },
    }
  );
};
