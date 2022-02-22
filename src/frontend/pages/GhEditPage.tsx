import { Container, Typography } from '@mui/material';
import { decode } from 'js-base64';
import React from 'react';
import IFile from '../../types/IFile';
import Editor from '../components/Editor';
import useGhPath from '../hooks/useGhPath';
import { changeLoading } from '../redux/loadingReducer';
import { useAppDispatch, useAppSelector } from '../redux/store';
import lscat from '../service/lscat';

interface IFileState {
  type: 'file';
  data: IFile;
}

interface INotExist {
  type: 'notExist';
}

const GhEditPage: React.FC = () => {
  const { owner, repo } = useAppSelector((state) => state.settings.settings);
  const [data, setData] = React.useState<IFileState | INotExist>();
  const path = useGhPath();
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    (async () => {
      dispatch(changeLoading(true));
      const res = await lscat({ owner, repo, path });
      if (res && !Array.isArray(res) && res.type !== 'dir') {
        setData(res);
      }
      dispatch(changeLoading(false));
    })();
  }, [owner, path, repo, dispatch]);
  if (
    data?.type === 'file' &&
    (data.data.name.endsWith('.md') || data.data.name.endsWith('.mdx'))
  ) {
    return (
      <Container>
        <Editor
          initialValue={data.data.content ? decode(data.data.content) : ''}
          path={path}
          sha={data.data.sha}
        />
      </Container>
    );
  }
  if (data?.type === 'notExist') {
    return (
      <Container>
        <Editor path={path} />
      </Container>
    );
  }
  return (
    <Container>
      <Typography>目前为止这不是一个可编辑的文件，或者加载失败了</Typography>
    </Container>
  );
};

export default GhEditPage;
