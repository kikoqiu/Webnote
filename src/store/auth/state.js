import * as api from '../api';
export default function () {
  let url=localStorage.getItem('url');
  let token=localStorage.getItem('token');
  api.config.url=url;
  api.config.token=token;
  return {
    url,
    token,
    show_login:!token,
  }
}
