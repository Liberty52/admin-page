import axios from 'axios';
import request from './axios';
import {
  CREATE_QUESTION_REPLY,
  DELETE_QUESTION_REPLY,
  QUESTION_DETAIL,
  QUESTION_LIST,
  UPDATE_QUESTION_REPLY,
  CREATE_NOTICE,
  UPDATE_NOTICE,
  UPLOAD_NOTICE_IMAGE,
  NOTICE_LIST,
  NOTICE_DETAIL,
} from '../constants/api';
import { ACCESS_TOKEN } from '../constants/token';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';
import { CONTENT_TYPE } from '../constants/content-type';

export const getQuestionList = async (page) => {
  return request.get(QUESTION_LIST(page, 10), {
    headers: {
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
    },
  });
};
export const getQuestionDetail = async (id) => {
  return request.get(QUESTION_DETAIL(id), {
    headers: {
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
    },
  });
};

export const createQuestionReply = (id, content) => {
  return request.post(
    CREATE_QUESTION_REPLY(),
    {
      questionId: id,
      content,
    },
    {
      headers: {
        Authorization: sessionStorage.getItem(ACCESS_TOKEN),
      },
    },
  );
};

export const updateQuestionReply = (id, content) => {
  return request.put(
    UPDATE_QUESTION_REPLY(id),
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

export const deleteQuestionReply = (id) => {
  return request.delete(DELETE_QUESTION_REPLY(id), {
    headers: {
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
    },
  });
};

const header = {
  headers: {
    Authorization: sessionStorage.getItem(ACCESS_TOKEN),
  },
};

export const getNoticeList = async (page) => {
  return request.get(NOTICE_LIST(page, 10), {
    headers: {
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
    },
  });
};

export const getNoticeDetail = async (id) => {
  return request.get(NOTICE_DETAIL(id), {
    headers: {
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
    },
  });
};

export const deleteNotice = (id) => {
  return request
    .delete(NOTICE_DETAIL(id), {
      headers: {
        Authorization: sessionStorage.getItem(ACCESS_TOKEN),
      },
    })
    .then(() => {
      window.location.replace('/notice');
    });
};

export const postNotice = (value, editorState, commentable) => {
  let data = {
    title: value.title,
    content: draftToHtml(convertToRaw(editorState.getCurrentContent())),
    commentable: commentable,
  };
  axios
    .post('https://liberty52.com:444/admin/notices', data, header)
    .then((res) => {
      window.location.href = '/notice';
    })
    .catch((err) => {
      alert('에러가 발생했습니다.');
    });
};

const todayTime = () => {
  let now = new Date();
  let todayMonth = now.getMonth() + 1;
  let todayDate = now.getDate();
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  let dayOfWeek = week[now.getDay()];
  let hours = now.getHours();
  let minutes = now.getMinutes();

  return (
    todayMonth + '월 ' + todayDate + '일 ' + dayOfWeek + '요일 ' + hours + '시 ' + minutes + '분'
  );
};

export const createNotice = (data, next) => {
  request
    .post(CREATE_NOTICE(), data, {
      headers: {
        Authorization: sessionStorage.getItem(ACCESS_TOKEN),
      },
    })
    .then((res) => {
      next();
    })
    .catch((err) => console.error(err));
};

export const updateNotice = (data, next, id) => {
  request
    .put(UPDATE_NOTICE(id), data, {
      headers: {
        Authorization: sessionStorage.getItem(ACCESS_TOKEN),
      },
    })
    .then((res) => {
      next();
    })
    .catch((err) => console.error(err));
};

export const uploadImage = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return request.post(UPLOAD_NOTICE_IMAGE(), formData, {
    headers: {
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
      'Content-Type': CONTENT_TYPE.MultipartFormData,
    },
  });
};
