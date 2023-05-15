import axios from "./axios";
import { CUSTOMER_LIST } from "../constants/api";
import { ACCESS_TOKEN } from "../constants/token";

export const getCustomerList = async (size, page, sort) => {
  return axios.get(CUSTOMER_LIST(size, page, sort), {
    headers: {
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
    },
  });
};
