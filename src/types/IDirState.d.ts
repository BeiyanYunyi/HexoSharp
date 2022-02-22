import IFile from './IFile';

export default interface IDirState {
  type: 'dir';
  data: IFile[];
}
