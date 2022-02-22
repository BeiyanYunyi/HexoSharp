import useGhPath from './useGhPath';

const useParentPath = () => {
  const path = useGhPath();
  const pathAry = path.split('/');
  pathAry.pop();
  return pathAry.join('/');
};

export default useParentPath;
