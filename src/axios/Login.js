import request from './axios';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants/token';
import { LOGIN, TOKEN_REFRESH } from '../constants/api';

export function post(dto, checked) {
  request
    .post(LOGIN(), JSON.stringify(dto), {
      headers: {
        'Content-Type': `application/json`,
      },
    })
    .then((response) => {
      if (checked) {
        localStorage.setItem(REFRESH_TOKEN, response.headers.refresh);
      }
      sessionStorage.setItem(ACCESS_TOKEN, response.headers.access);
      window.location.replace('/');
    })
    .catch(() => {
      alert('로그인 실패.');
    });
}

export function refresh() {
  request
    .get(
      TOKEN_REFRESH(), // token refresh api
      {
        headers: {
          'LB-RefreshToken': localStorage.getItem(REFRESH_TOKEN),
        },
      },
    )
    .then((res) => {
      sessionStorage.setItem(ACCESS_TOKEN, res.headers.access);
      localStorage.setItem(REFRESH_TOKEN, res.headers.refresh);
    })
    .catch(() => {
      sessionStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);
      window.location.href = '/login';
    });
}
