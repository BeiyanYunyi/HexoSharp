import { useAppSelector } from '../redux/store';

const useImgPathInfo = () => {
  const settings = useAppSelector((state) => state.settings.settings);
  return {
    owner: settings.imgRepoOwner || settings.owner,
    repo: settings.imgRepo || settings.repo,
    path: settings.imgPath,
  };
};

export default useImgPathInfo;
