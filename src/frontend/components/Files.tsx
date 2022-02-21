import { Card, CardActionArea, CardHeader, CircularProgress, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { decode } from 'js-base64';

import IFile from '../../types/IFile';
import { useAppSelector } from '../redux/store';
import lscat from '../service/lscat';
import FileIcon from './FileIcon';
import Editor from './Editor';

interface IDirState {
  type: 'dir';
  data: IFile[];
}

interface IFileState {
  type: 'file';
  data: IFile;
}

const useGhPath = () => {
  const location = useLocation();
  const pathToReturn = location.pathname.replace('/ghView', '');
  return pathToReturn === '/' ? '' : pathToReturn;
};

const File: React.FC<{ file: IFile }> = ({ file }) => {
  const navigate = useNavigate();
  return (
    <Card>
      <CardActionArea
        onClick={() => {
          navigate(`/ghView/${file.path}`);
        }}
      >
        <CardHeader title={file.name} avatar={<FileIcon name={file.name} type={file.type} />} />
      </CardActionArea>
    </Card>
  );
};

const ReturnToParent: React.FC<{}> = () => {
  const navigate = useNavigate();
  const path = useGhPath();
  const getParentPath = () => {
    const pathAry = path.split('/');
    pathAry.pop();
    return pathAry.join('/');
  };
  return (
    <Grid item>
      <Card>
        <CardActionArea
          onClick={() => {
            navigate(`/ghView${getParentPath()}`);
          }}
        >
          <CardHeader title=".." avatar={<FileIcon name=".." type="dir" />} />
        </CardActionArea>
      </Card>
    </Grid>
  );
};

const Files: React.FC = () => {
  const settings = useAppSelector((state) => state.settings.settings);
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<IDirState | IFileState>({ type: 'dir', data: [] });
  const path = useGhPath();
  console.log({ path, data });
  useEffect(() => {
    (async () => {
      if (!settings.owner || !settings.repo) return null;
      const res = await lscat({ owner: settings.owner, repo: settings.repo, path });
      if (res) {
        setData(res);
        setLoading(false);
      }
      return null;
    })();
  }, [path, settings.owner, settings.repo]);
  if (loading) return <CircularProgress />;
  if (data.type === 'dir') {
    return (
      <Grid container spacing={1}>
        {path !== '' && <ReturnToParent />}
        {data.data.map((file) => (
          <Grid item key={file.sha}>
            <File file={file} />
          </Grid>
        ))}
      </Grid>
    );
  }
  if (data.data.name.endsWith('.md') || data.data.name.endsWith('.mdx')) {
    return <Editor value={decode(data.data.content || '')} />;
  }
  return <Grid container>{decode(data.data.content || '')}</Grid>;
};

export default Files;
