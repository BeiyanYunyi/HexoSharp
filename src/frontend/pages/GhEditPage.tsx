import { CircularProgress, Container, Typography } from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { decode } from 'js-base64';
import IFile from '../../types/IFile';
import Editor from '../components/Editor';
import { useAppSelector } from '../redux/store';
import lscat from '../service/lscat';

interface IFileState {
  type: 'file';
  data: IFile;
}

const useGhPath = () => {
  const location = useLocation();
  const pathToReturn = location.pathname.replace('/ghEdit/', '');
  return pathToReturn === '/' ? '' : pathToReturn;
};

const GhEditPage: React.FC = () => {
  const { owner, repo } = useAppSelector((state) => state.settings.settings);
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<IFileState>();
  const path = useGhPath();
  React.useEffect(() => {
    (async () => {
      const res = await lscat({ owner, repo, path });
      if (res && !Array.isArray(res) && res.type === 'file') {
        setData(res);
      }
      setLoading(false);
    })();
  }, [owner, path, repo]);
  if (loading) return <CircularProgress />;
  if (data && (data.data.name.endsWith('.md') || data.data.name.endsWith('.mdx'))) {
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
  return (
    <Container>
      <Typography>目前为止这不是一个可编辑的文件</Typography>
    </Container>
  );
};

export default GhEditPage;
