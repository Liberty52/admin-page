import request from "./axios";
import {
  REVIEW_LIST,
  REVIEW_DETAIL,
  CREATE_REVIEW_REPLY,
} from "../constants/api";
import { ACCESS_TOKEN } from "../constants/token";

export const getReviewList = async (page) => {
  return request.get(REVIEW_LIST(page, 11), {
    headers: {
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
    },
  });
};

export const getReviewDetail = async (id) => {
  return request.get(REVIEW_DETAIL(id), {
    headers: {
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
    },
  });
};

export const createReviewReply = (id, content) => {
  return request.post(
    CREATE_REVIEW_REPLY(id),
    {
      content,
    },
    {
      headers: {
        Authorization: sessionStorage.getItem(ACCESS_TOKEN),
      },
    }
  );
};
