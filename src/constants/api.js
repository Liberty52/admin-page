export const QUESTION_LIST = (page, pageSize) =>
  `/admin/questions?page=${page}&size=${pageSize}`;
export const DELETE_QUESTION_REPLY = (id) => `/admin/questionReplies/${id}`;
export const QUESTION_DETAIL = (id) => `/admin/questions/${id}`;
export const CREATE_QUESTION_REPLY = () => `/admin/questionReplies`;
export const UPDATE_QUESTION_REPLY = (id) => `/admin/questionReplies/${id}`;
export const UPLOAD_IMAGE = () => `/auth/questions/img`;

export const CUSTOMER_LIST = (size, page, sort) => {
  let sortParam = "";
  for (const key in sort) {
    const isDesc = sort[key];
    sortParam += `&sort=${key}`;
    if (isDesc) sortParam += `,desc`;
  }
  return `/admin/user-info?size=${size}&page=${page}${sortParam}`;
};

export const TOKEN_REFRESH = () => `/auth/refresh`;
export const LOGIN = () => `/admin/login`;
