import IFile from './IFile';

/** 一个目录 */
export default interface IDirState {
  type: 'dir';
  data: IFile[];
}
