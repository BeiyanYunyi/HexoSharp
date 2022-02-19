import axios from 'axios';

const kv = {
  get: async (key: string) => {
    const res = await axios.get(`/api/kv/${key}`);
    if (!res.data) return null;
    return res.data.value as string;
  },
  set: async (key: string, value: string) => {
    const res = await axios.post(`/api/kv/${key}`, { value });
    if (res.status !== 201) throw new Error('Set kv failed');
  },
  delete: async (key: string) => {
    await axios.delete(`/api/kv/${key}`);
  },
};

export default kv;
