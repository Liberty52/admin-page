export const QUESTION_LIST = (page, pageSize) => `/admin/questions?page=${page}&size=${pageSize}`
export const DELETE_QUESTION_REPLY = (id) => `/admin/questionReplies/${id}`
export const QUESTION_DETAIL = (id) => `/admin/questions/${id}`;
export const CREATE_QUESTION_REPLY = () => `/admin/questionReplies`
export const UPDATE_QUESTION_REPLY = (id) => `/admin/questionReplies/${id}`
export const UPLOAD_IMAGE = ()=>`/auth/questions/img`;