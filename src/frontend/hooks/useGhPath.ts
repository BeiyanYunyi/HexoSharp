import { useLocation } from 'react-router-dom';

const useGhPath = () => {
  const location = useLocation();
  const pathAry = location.pathname.split('/');
  const idx =
    pathAry.indexOf('ghView') !== -1 ? pathAry.indexOf('ghView') : pathAry.indexOf('ghEdit');
  const pathToReturn = pathAry.slice(idx + 1).join('/');
  return pathToReturn;
};

export default useGhPath;
