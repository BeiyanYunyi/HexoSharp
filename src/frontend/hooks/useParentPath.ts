import useGhPath from './useGhPath';

/** 获取上级目录信息 */
const useParentPath = () => {
  const path = useGhPath();
  const pathAry = path.split('/');
  pathAry.pop();
  return pathAry.join('/');
};

export default useParentPath;
