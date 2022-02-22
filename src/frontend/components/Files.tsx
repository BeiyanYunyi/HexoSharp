import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { decode } from 'js-base64';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import IFile from '../../types/IFile';
import useGhPath from '../hooks/useGhPath';
import { changeLoading } from '../redux/loadingReducer';
import { useAppDispatch, useAppSelector } from '../redux/store';
import lscat from '../service/lscat';
import FileIcon from './FileIcon';
import Preview from './Preview';

interface IDirState {
  type: 'dir';
  data: IFile[];
}

interface IFileState {
  type: 'file';
  data: IFile;
}

const File: React.FC<{
  file: IFile;
}> = ({ file }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  return (
    <Card sx={{ width: theme.breakpoints.values.sm / 3 }}>
      <CardActionArea
        onClick={() => {
          dispatch(changeLoading(true));
          navigate(`/ghView/${file.path}`);
        }}
      >
        <CardHeader title={file.name} avatar={<FileIcon name={file.name} type={file.type} />} />
      </CardActionArea>
    </Card>
  );
};

const useParentPath = () => {
  const path = useGhPath();
  const pathAry = path.split('/');
  pathAry.pop();
  return pathAry.join('/');
};

const ReturnToParent: React.FC = () => {
  const navigate = useNavigate();
  const parentPath = useParentPath();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  return (
    <Grid item sx={{ width: theme.breakpoints.values.sm / 3 }}>
      <Card>
        <CardActionArea
          onClick={() => {
            dispatch(changeLoading(true));
            navigate(`/ghView/${parentPath}`);
          }}
        >
          <CardHeader title=".." avatar={<FileIcon name=".." type="dir" />} />
        </CardActionArea>
      </Card>
    </Grid>
  );
};

const NewFolderOrFile: React.FC<{ folder?: boolean }> = ({ folder }) => {
  const path = useGhPath();
  const navigate = useNavigate();
  const [notValid, setNotValid] = React.useState(false);
  const [target, setTarget] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);
  return (
    <>
      <Grid item>
        <Card sx={{ width: theme.breakpoints.values.sm / 3 }}>
          <CardActionArea onClick={openDialog}>
            <CardHeader
              title={`新建文件${folder ? '夹' : ''}`}
              avatar={<FileIcon name="+" type={folder ? 'newDir' : 'newFile'} />}
            />
          </CardActionArea>
        </Card>
      </Grid>
      <Dialog open={open} onClose={closeDialog}>
        <DialogTitle>{`新建文件${folder ? '夹' : ''}`}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {folder ? (
              <>
                只有在新文件夹内新建文件并保存，新文件夹才会被提交
                <br />
              </>
            ) : (
              <>
                需要以 .md 或者 .mdx 结尾
                <br />
              </>
            )}
            支持递归创建，用/分隔
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            fullWidth
            label={`文件${folder ? '夹' : ''}名`}
            value={target}
            error={notValid}
            onChange={(e) => {
              if (!e.target.value) {
                setNotValid(true);
              } else if (notValid) setNotValid(false);
              if (!folder) {
                if (!e.target.value.endsWith('.md') && !e.target.value.endsWith('.mdx')) {
                  setNotValid(true);
                } else if (notValid) setNotValid(false);
              }
              setTarget(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>取消</Button>
          <Button
            onClick={() => {
              if (!notValid) {
                if (folder) {
                  navigate('/ghView'.concat(path.concat(`/${target}`)));
                } else {
                  navigate('/ghEdit'.concat(path.concat(`/${target}`)));
                }
                closeDialog();
              }
            }}
          >
            确定
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const Files: React.FC = () => {
  const settings = useAppSelector((state) => state.settings.settings);
  const dispatch = useAppDispatch();
  const [data, setData] = React.useState<IDirState | IFileState>({ type: 'dir', data: [] });
  const path = useGhPath();
  const parentPath = useParentPath();
  const navigate = useNavigate();
  useEffect(() => {
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
    return (
      <Grid container spacing={1} justifyContent="flex-start">
        {path !== '' && <ReturnToParent />}
        {data.data.map((file) => (
          <Grid item key={file.sha}>
            <File file={file} />
          </Grid>
        ))}
        <NewFolderOrFile folder />
        <NewFolderOrFile />
      </Grid>
    );
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

export default Files;
