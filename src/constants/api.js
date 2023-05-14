export const QUESTION_LIST = (page, pageSize) =>
  `/admin/questions?page=${page}&size=${pageSize}`;
export const DELETE_QUESTION_REPLY = (id) => `/admin/questionReplies/${id}`;
export const QUESTION_DETAIL = (id) => `/admin/questions/${id}`;
export const CREATE_QUESTION_REPLY = () => `/admin/questionReplies`;
export const UPDATE_QUESTION_REPLY = (id) => `/admin/questionReplies/${id}`;
export const UPLOAD_IMAGE = () => `/auth/questions/img`;

export const CUSTOMER_LIST = (size, page, name, sort) =>
  `/admin/user-info?size=${size}&page=${page}&sort=${name}&sort=${sort}`;

export const TOKEN_REFRESH = () => `/auth/refresh`;
export const LOGIN = () => `/admin/login`;
