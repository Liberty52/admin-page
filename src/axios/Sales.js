import { TOTAL_SALES } from '../constants/api';
import { CONTENT_TYPE } from '../constants/content-type';
import { ACCESS_TOKEN } from '../constants/token';
import request from './axios';

export const getTotalSales = async () => {
  return request.get(TOTAL_SALES(), {
    headers: {
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
      'Content-Type': CONTENT_TYPE.ApplicationJson,
    },
  });
};

export const getSpecificSales = (dto) => {
  return request.get(TOTAL_SALES(), dto, {
    headers: {
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
    },
  });
};
