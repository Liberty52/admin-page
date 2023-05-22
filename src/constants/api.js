export const TOKEN_REFRESH = () => `/auth/refresh`;
export const LOGIN = () => `/admin/login`;

// 문의 api
export const QUESTION_LIST = (page, pageSize) =>
  `/admin/questions?page=${page}&size=${pageSize}`;
export const DELETE_QUESTION_REPLY = (id) => `/admin/questionReplies/${id}`;
export const QUESTION_DETAIL = (id) => `/admin/questions/${id}`;
export const CREATE_QUESTION_REPLY = () => `/admin/questionReplies`;
export const UPDATE_QUESTION_REPLY = (id) => `/admin/questionReplies/${id}`;
export const UPLOAD_IMAGE = () => `/auth/questions/img`;

// 리뷰 api
export const REVIEW_LIST = (page, pageSize) =>
  `/admin/reviews?size=${pageSize}&page=${page}`;
export const CREATE_REVIEW_REPLY = (id) => `/admin/reviews/${id}/replies`;

// 고객 조회 api
export const CUSTOMER_LIST = (size, page, sort) => {
  let sortParam = "";
  for (const key in sort) {
    const isDesc = sort[key];
    sortParam += `&sort=${key}`;
    if (isDesc) sortParam += `,desc`;
  }
  return `/admin/user-info?size=${size}&page=${page}${sortParam}`;
};

// 주문 조회 api
export const CANCELED_ORDERS = (size, page, type) => {
  return `/admin/orders/cancel??size=${size}&page=${page}&type=${type}`;
};

export const CANCELED_ORDER_DETAILS = (orderId) => {
  return `/admin/orders/cancel/${orderId}`;
};

// 환불 요청 api
export const APPROVE_CANCEL = () => {
  return `/admin/orders/refund`;
};
