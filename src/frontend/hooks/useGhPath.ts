import { useLocation } from 'react-router-dom';

/** 获取当前浏览器路径所表示的 GitHub 路径 */
const useGhPath = () => {
  const location = useLocation();
  const pathAry = location.pathname.split('/');
  const idx =
    pathAry.indexOf('ghView') !== -1 ? pathAry.indexOf('ghView') : pathAry.indexOf('ghEdit');
  const pathToReturn = pathAry.slice(idx + 1).join('/');
  return pathToReturn;
};

export default useGhPath;
