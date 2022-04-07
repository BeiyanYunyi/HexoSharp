import axios from 'axios';

/** Axios 错误处理，当登录失效时移除存在 localStorage 里的 token */
const axiosErrorHandler = async (e: unknown) => {
  if (!axios.isAxiosError(e)) return console.error(e);
  if (e.response?.status === 401) {
    localStorage.removeItem('authToken');
    return window.location.reload();
  }
  return null;
};

export default axiosErrorHandler;
