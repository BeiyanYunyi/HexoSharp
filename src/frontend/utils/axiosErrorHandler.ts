import axios from 'axios';

const axiosErrorHandler = async (e: unknown) => {
  if (!axios.isAxiosError(e)) return console.error(e);
  if (e.response?.status === 401) {
    localStorage.removeItem('authToken');
    return window.location.reload();
  }
  return null;
};

export default axiosErrorHandler;
