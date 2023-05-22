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


export const CUSTOMER_LIST = (size, page, name, sort) =>
  `/admin/user-info?size=${size}&page=${page}&sort=${name}&sort=${sort}`;


// 상품 관리
export const PRODUCT_LIST = () => `/admin/productInfo`;
export const PRODUCT_DETAIL = (productId) => `/admin/productInfo/${productId}`;
export const PRODUCT_OPTION_LIST = (productId) => `/admin/productOptionInfo/${productId}`;
export const ADD_PRODUCT_OPTION_DETAIL = (optionId) => `/admin/optionDetail/${optionId}`;
export const DELETE_PRODUCT_OPTION_DETAIL = (optionDetailId) => `/admin/optionDetail/${optionDetailId}`;