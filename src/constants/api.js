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
export const REVIEW_DETAIL = (id) => `/admin/reviews/${id}`;
export const CREATE_REVIEW_REPLY = (id) => `/admin/reviews/${id}/replies`;
export const UPDATE_REVIEW_REPLY = (reviewId, replyId) =>
  `/admin/reviews/${reviewId}/replies/${replyId}`;
export const DELETE_REVIEW_REPLY = (id) => `/admin/reviews/replies/${id}`;
export const DELETE_CUSTOMER_REVIEW = (id) => `/admin/customerReviews/${id}`;

// 공지사항 api
export const NOTICE_LIST = (page, pageSize) =>
  `/admin/notices?page=${page}&size=${pageSize}`;
export const NOTICE_DETAIL = (id) => `/admin/notices/${id}`;
export const CREATE_NOTICE = () => `/admin/notices`;
export const UPDATE_NOTICE = (id) => `/admin/notices/${id}`;
export const UPLOAD_NOTICE_IMAGE = () => `/auth/questions/img`;

// 고객 조회 api
export const CUSTOMER_LIST = (size, page, sort) => {
  let sortParam = "";
  for (const key in sort) {
    const isDesc = sort[key];
    sortParam += `&sort=${key}`;
    if (isDesc) sortParam += `,desc`;
  }
  return `/admin/customer-info?size=${size}&page=${page}${sortParam}`;
};

// 주문 조회 api
export const CANCELED_ORDERS = (size, page, type) => {
  return `/admin/orders/cancel??size=${size}&page=${page}&type=${type}`;
};
export const CANCELED_ORDER_DETAILS = (orderId) => {
  return `/admin/orders/cancel/${orderId}`;
};
export const UPSCALE_IMAGE = () => {
  return `/product/images/upscaling`;
};

export const CHANGE_ORDER_STATUS = (orderId) =>
  `/admin/orders/${orderId}/status`;

// 송장 api
export const DELIVERY_COMPANY_LIST = (international) =>
  `/admin/orders/courier-companies?international=${international}`;
export const CREATE_TRACKING_INFO = (orderId) =>
  `/admin/orders/${orderId}/delivery`;

// 환불 요청 api
export const APPROVE_CANCEL = () => {
  return `/admin/orders/refund`;
};

// 상품 관리 api
export const PRODUCT_LIST = () => `/admin/productInfo`;
export const PRODUCT_DETAIL = (productId) => `/admin/productInfo/${productId}`;
export const PRODUCT_OPTION_LIST = (productId, onSale) =>
  `/admin/productOptionInfo/${productId}?onSale=${onSale}`;

export const ADD_PRODUCT_OPTION = (productId) =>
  `/admin/productOption/${productId}`;
export const UPDATE_PRODUCT_OPTION = (optionId) =>
  `/admin/productOption/${optionId}`;
export const CHANGE_PRODUCT_ON_SALE = (optionId) =>
  `/admin/productOptionOnSale/${optionId}`;

export const ADD_PRODUCT_OPTION_DETAIL = (optionId) =>
  `/admin/optionDetail/${optionId}`;
export const CHANGE_PRODUCT_OPTION_DETAIL_ON_SALE = (optionDetailId) =>
  `/admin/optionDetailOnSale/${optionDetailId}`;
export const UPDATE_PRODUCT_OPTION_DETAIL = (optionDetailId) =>
  `/admin/optionDetail/${optionDetailId}`;
// - 소개 관리
export const ADD_PRODUCT_INTRODUCTION = (productId) =>
  `/admin/product/${productId}/introduction`;

// 가상계좌 관리 api
export const POST_NEW_VBANK = () => `/admin/vbanks`;
export const GET_VBANKS = () => `/product/vbanks`;
export const PUT_VBANK = (vbankId) => `/admin/vbanks/${vbankId}`;
export const DELETE_VBANK = (vbankId) => `/admin/vbanks/${vbankId}`;

// 배송비 관리 api
export const GET_DEFAULT_DELIVERY_FEE = () => `/product/options/delivery/fee`;
export const PATCH_DEFAULT_DELIVERY_FEE = () => `/admin/options/delivery/fee`;

// 라이센스 관리 api
export const LICENSE_LIST = () => `/admin/licenseImage`;
export const CREATE_LICENSE = () => `/admin/licenseImage`;
export const DELETE_LICENSE = (licenseImageId) => `/admin/licenseImage/${licenseImageId}`;
export const MODIFY_LICENSE = (licenseImageId) => `/admin/licenseImage/${licenseImageId}`;
export const GET_DETAIL_LICENSE = (licenseImageId) => `/admin/licenseImage/${licenseImageId}`;

//상품 라이센스 옵션 api
export const CUSTOM_LICENSE = () => `/admin/product`;
