import ISettings from '../../types/ISettings';

/** 在后端获取用户配置项 */
const getConfig = async () => {
  const configStr = await HSPKV.get('settings');
  if (!configStr) return null;
  const config = JSON.parse(configStr) as ISettings;
  return config;
};

export default getConfig;
