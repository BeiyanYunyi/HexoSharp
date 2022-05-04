import ISettings from '../../types/ISettings';

const getConfig = async () => {
  const config = JSON.parse((await HSPKV.get('settings'))!) as ISettings;
  return config;
};

export default getConfig;
