import axios from "./axios";
import { CUSTOMER_LIST } from "../constants/api";
import { ACCESS_TOKEN } from "../constants/token";

export const getCustomerList = async (size, page, name, sort) => {
  return axios.get(CUSTOMER_LIST(size, page, name, sort), {
    headers: {
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
    },
  });
};
