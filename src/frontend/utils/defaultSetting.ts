import ISettings from '../../types/ISettings';

/** 所有设置项的默认值 */
const defaultSetting: ISettings = {
  ghApiToken: '',
  owner: '',
  repo: '',
  imgRepo: '',
  imgPath: '',
  imgRepoOwner: '',
  databaseRepo: '',
  databaseRepoOwner: '',
  issueTag: '',
};

export default defaultSetting;
