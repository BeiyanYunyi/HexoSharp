import axiosErrorHandler from '../utils/axiosErrorHandler';
import axiosClient from './axiosClient';

/** Cloudflare KV 的 CRUD 接口 */
class Kv {
  // eslint-disable-next-line class-methods-use-this
  client() {
    return axiosClient.client;
  }

  // eslint-disable-next-line class-methods-use-this
  private async handleErr(e: unknown) {
    return axiosErrorHandler(e);
  }

  async get(key: string) {
    try {
      const res = await this.client().get(`/api/kv/${key}`);
      if (!res.data) return null;
      return res.data.value as string;
    } catch (e) {
      this.handleErr(e);
      return null;
    }
  }

  async set(key: string, value: string) {
    try {
      const res = await this.client().post(`/api/kv/${key}`, { value });
      if (res.status !== 201) throw new Error('Set kv failed');
      return await Promise.resolve();
    } catch (e) {
      this.handleErr(e);
      return Promise.reject();
    }
  }

  async delete(key: string) {
    try {
      await this.client().delete(`/api/kv/${key}`);
      return await Promise.resolve();
    } catch (e) {
      this.handleErr(e);
      return Promise.reject();
    }
  }
}

const kv = new Kv();

export default kv;
