import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { decode } from 'js-base64';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import IDirState from '../../types/IDirState';
import IFileState from '../../types/IFileState';
import Files from '../components/Files';
import Preview from '../components/Preview';
import useGhPath from '../hooks/useGhPath';
import useParentPath from '../hooks/useParentPath';
import { changeLoading } from '../redux/loadingReducer';
import { useAppDispatch, useAppSelector } from '../redux/store';
import lscat from '../service/lscat';

const GhViewPage: React.FC = () => {
  const settings = useAppSelector((state) => state.settings.settings);
  const dispatch = useAppDispatch();
  const [data, setData] = React.useState<IDirState | IFileState>({ type: 'dir', data: [] });
  const path = useGhPath();
  const parentPath = useParentPath();
  const navigate = useNavigate();
  React.useEffect(() => {
    (async () => {
      dispatch(changeLoading(true));
      if (!settings.owner || !settings.repo) return null;
      const res = await lscat({ owner: settings.owner, repo: settings.repo, path });
      if (!res) return null;
      if (res.type !== 'notExist') {
        setData(res);
        return dispatch(changeLoading(false));
      }
      setData({ type: 'dir', data: [] });
      return dispatch(changeLoading(false));
    })();
  }, [path, settings.owner, settings.repo, dispatch]);
  if (data.type === 'dir') {
    return <Files data={data} />;
  }
  if (data.data.name.endsWith('.md') || data.data.name.endsWith('.mdx')) {
    return <Preview value={decode(data.data.content || '')} />;
  }
  return (
    <Card>
      <CardActions>
        <Button
          variant="outlined"
          color="error"
          onClick={() => {
            navigate(`/ghView/${parentPath}`);
          }}
        >
          返回
        </Button>
      </CardActions>
      <CardContent>
        <Typography component="div" sx={{ whiteSpace: 'pre-line' }}>
          {decode(data.data.content || '')}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default GhViewPage;
