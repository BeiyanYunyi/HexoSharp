import IFile from './IFile';

/** 一个文件 */
export default interface IFileState {
  type: 'file';
  data: IFile;
}
