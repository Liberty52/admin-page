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

// 공지사항 api
export const NOTICE_LIST = (page, pageSize) =>
  `/admin/notices?page=${page}&size=${pageSize}`;
export const NOTICE_DETAIL = (id) => `/admin/notices/${id}`;
export const CREATE_NOTICE = () => `/admin/notices`;

export const CUSTOMER_LIST = (size, page, name, sort) =>
  `/admin/user-info?size=${size}&page=${page}&sort=${name}&sort=${sort}`;

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
