export const TOKEN_REFRESH = () => `/auth/refresh`;
export const LOGIN = () => `/admin/login`;

// 문의 api
export const QUESTION_LIST = (page, pageSize) => `/admin/questions?page=${page}&size=${pageSize}`;
export const DELETE_QUESTION_REPLY = (id) => `/admin/questionReplies/${id}`;
export const QUESTION_DETAIL = (id) => `/admin/questions/${id}`;
export const CREATE_QUESTION_REPLY = () => `/admin/questionReplies`;
export const UPDATE_QUESTION_REPLY = (id) => `/admin/questionReplies/${id}`;
export const UPLOAD_IMAGE = () => `/auth/questions/img`;

// 리뷰 api
export const REVIEW_LIST = (page, pageSize) => `/admin/reviews?size=${pageSize}&page=${page}`;
export const REVIEW_DETAIL = (id) => `/admin/reviews/${id}`;
export const CREATE_REVIEW_REPLY = (id) => `/admin/reviews/${id}/replies`;
export const UPDATE_REVIEW_REPLY = (reviewId, replyId) =>
  `/admin/reviews/${reviewId}/replies/${replyId}`;
export const DELETE_REVIEW_REPLY = (id) => `/admin/reviews/replies/${id}`;
export const DELETE_CUSTOMER_REVIEW = (id) => `/admin/customerReviews/${id}`;

// 공지사항 api
export const NOTICE_LIST = (page, pageSize) => `/admin/notices?page=${page}&size=${pageSize}`;
export const NOTICE_DETAIL = (id) => `/admin/notices/${id}`;
export const CREATE_NOTICE = () => `/admin/notices`;
export const UPDATE_NOTICE = (id) => `/admin/notices/${id}`;
export const UPLOAD_NOTICE_IMAGE = () => `/auth/questions/img`;

// 고객 조회 api
export const CUSTOMER_LIST = (size, page, sort) => {
  let sortParam = '';
  for (const key in sort) {
    const isDesc = sort[key];
    sortParam += `&sort=${key}`;
    if (isDesc) sortParam += `,desc`;
  }
  return `/admin/customer-info?size=${size}&page=${page}${sortParam}`;
};

// 주문 조회 api
export const CANCELED_ORDERS = (size, page, type) =>
  `/admin/orders/cancel??size=${size}&page=${page}&type=${type}`;
export const CANCELED_ORDER_DETAILS = (orderId) => `/admin/orders/cancel/${orderId}`;

// 업스케일링
export const UPSCALE_IMAGE = () => `/product/images/upscaling`;

export const CHANGE_ORDER_STATUS = (orderId) => `/admin/orders/${orderId}/status`;

// 송장 api
export const DELIVERY_COMPANY_LIST = (international) =>
  `/admin/orders/courier-companies?international=${international}`;
export const CREATE_TRACKING_INFO = (orderId) => `/admin/orders/${orderId}/delivery`;

// 환불 요청 api
export const APPROVE_CANCEL = () => `/admin/orders/refund`;
// 상품 관리 api
export const PRODUCT_LIST = () => `/admin/productInfo`;
export const PRODUCT_DETAIL = (productId) => `/admin/productInfo/${productId}`;
export const PRODUCT_OPTION_LIST = (productId, onSale) =>
  `/admin/productOptionInfo/${productId}?onSale=${onSale}`;

export const ADD_PRODUCT_OPTION = (productId) => `/admin/productOption/${productId}`;
export const UPDATE_PRODUCT_OPTION = (optionId) => `/admin/productOption/${optionId}`;
export const CHANGE_PRODUCT_ON_SALE = (optionId) => `/admin/productOptionOnSale/${optionId}`;

export const ADD_PRODUCT_OPTION_DETAIL = (optionId) => `/admin/optionDetail/${optionId}`;
export const CHANGE_PRODUCT_OPTION_DETAIL_ON_SALE = (optionDetailId) =>
  `/admin/optionDetailOnSale/${optionDetailId}`;
export const UPDATE_PRODUCT_OPTION_DETAIL = (optionDetailId) =>
  `/admin/optionDetail/${optionDetailId}`;

export const GET_DELIVERY_OPTION = (productId) => `/admin/products/${productId}/deliveryOptions`;
export const ADD_DELIVERY_OPTION = (productId) => `/admin/products/${productId}/deliveryOptions`;
export const UPDATE_DELIVERY_OPTION = (productId) => `/admin/products/${productId}/deliveryOptions`;

// - 소개 관리
export const PATCH_PRODUCT_INTRODUCTION = (productId) => `/admin/product/${productId}/introduction`;
export const DELETE_PRODUCT_INTRODUCTION = (productId) =>
  `/admin/product/${productId}/introduction`;
export const UPLOAD_PRODUCT_IMAGE = () => `/admin/productIntroduction/img`;
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

// 실시간 배송정보 조회 api
export const GET_REDIRECT_URL_OF_ORDER_DELIEVERY = (orderId, courierCode, trackingNumber) =>
  `/product/orders/${orderId}/delivery?courierCode=${courierCode}&trackingNumber=${trackingNumber}`;

//라이선스 상품 옵션 api
export const CREATE_LICENSE_OPTION = (productId) => `/admin/licenseOption/${productId}`;
export const MODIFY_LICENSE_OPTION = (licenseOptionId) => `/admin/licenseOption/${licenseOptionId}`;
//라이선스 상품 디테일 옵션 api
export const CREATE_LICENSE_OPTION_DETAIL = (licenseOptionId) =>
  `/admin/licenseOptionDetail/${licenseOptionId}`;
export const MODIFY_LICENSE_OPTION_DETAIL = (licenseOptionDetailId) =>
  `/admin/licenseOptionDetail/${licenseOptionDetailId}`;
export const MODIFY_LICENSE_OPTION_ONSALE_DETAIL = () =>
  `/admin/licenseOptionDetailOnSale/{licenseOptionDetailId}`;
export const RETRIEVE_LICENSE_OPTION_LIST = (productId, onSale) =>
  `/admin/licenseProductOptionInfo/${productId}?onSale=${onSale}`;

// 상품 정보를 수정하는 api
export const PATCH_PRODUCT = (productId) => `/admin/product/${productId}`;
// 상품을 삭제하는 api
export const DELETE_PRODUCT = (productId) => `/admin/product/${productId}`;
