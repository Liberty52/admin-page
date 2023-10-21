import request from './axios';
import {
  REVIEW_LIST,
  REVIEW_DETAIL,
  CREATE_REVIEW_REPLY,
  DELETE_REVIEW_REPLY,
  UPDATE_REVIEW_REPLY,
  DELETE_CUSTOMER_REVIEW,
} from '../constants/api';
import { ACCESS_TOKEN } from '../constants/token';

export const getReviewList = async (page) => {
  return request.get(REVIEW_LIST(page, 20), {
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
    },
  );
};

export const updateReviewReply = (reviewId, replyId, content) => {
  return request.put(
    UPDATE_REVIEW_REPLY(reviewId, replyId),
    {
      content,
    },
    {
      headers: {
        Authorization: sessionStorage.getItem(ACCESS_TOKEN),
      },
    },
  );
};

export const deleteReviewReply = (id) => {
  return request.delete(DELETE_REVIEW_REPLY(id), {
    headers: {
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
    },
  });
};

export const deleteCustomerReview = (id) => {
  return request.delete(DELETE_CUSTOMER_REVIEW(id), {
    headers: {
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
    },
  });
};
