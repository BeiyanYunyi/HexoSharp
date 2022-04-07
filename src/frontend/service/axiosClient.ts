import axios, { AxiosInstance } from 'axios';

/** 保存一个 Axios 实例，方便用户验证 */
class AxiosClient {
  client = axios.create();

  changeClient(newInst: AxiosInstance) {
    this.client = newInst;
  }

  private async validate() {
    const token = localStorage.getItem('authToken');
    if (!token) return Promise.resolve(false);
    const newClient = axios.create({ headers: { Authorization: `Bearer ${token}` } });
    const res = await newClient.get('/api/ping', { validateStatus: (status) => status < 500 });
    if (res.status !== 200) {
      localStorage.removeItem('authToken');
      return Promise.resolve(false);
    }
    this.client = newClient;
    return Promise.resolve(true);
  }

  async login(password?: string) {
    if (password) {
      const res = await axios.post('/api/auth', { password }, { validateStatus: () => true });
      if (res.status >= 300) {
        return false;
      }
      localStorage.setItem('authToken', res.data.signed);
    }
    return this.validate();
  }
}

const axiosClient = new AxiosClient();

export default axiosClient;
