import {
  Button,
  Card,
  CardActionArea,
  CardHeader,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import IDirState from '../../types/IDirState';
import IFile from '../../types/IFile';
import useGhPath from '../hooks/useGhPath';
import useParentPath from '../hooks/useParentPath';
import { changeLoading } from '../redux/loadingReducer';
import { useAppDispatch } from '../redux/store';
import AppGridItem from './AppGridItem';
import FileIcon from './FileIcon';

const NewFolderOrFile: React.FC<{ folder?: boolean }> = ({ folder }) => {
  const path = useGhPath();
  const navigate = useNavigate();
  const [notValid, setNotValid] = React.useState(false);
  const [target, setTarget] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);
  const targetPath = (() => {
    if (path !== '') return `${path}/${target}`;
    return target;
  })();
  return (
    <>
      <AppGridItem>
        <Card sx={{ width: '100%' }}>
          <CardActionArea onClick={openDialog}>
            <CardHeader
              title={`新建文件${folder ? '夹' : ''}`}
              avatar={<FileIcon name="+" type={folder ? 'newDir' : 'newFile'} />}
            />
          </CardActionArea>
        </Card>
      </AppGridItem>
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
                  navigate('/ghView/'.concat(targetPath));
                } else {
                  navigate('/ghEdit/'.concat(targetPath));
                }
                setTarget('');
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

const File: React.FC<{
  file: IFile;
}> = ({ file }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  return (
    <Card sx={{ width: '100%' }}>
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

const ReturnToParent: React.FC = () => {
  const navigate = useNavigate();
  const parentPath = useParentPath();
  const dispatch = useAppDispatch();
  return (
    <AppGridItem>
      <Card sx={{ width: '100%' }}>
        <CardActionArea
          onClick={() => {
            dispatch(changeLoading(true));
            navigate(`/ghView/${parentPath}`);
          }}
        >
          <CardHeader title=".." avatar={<FileIcon name=".." type="parentDir" />} />
        </CardActionArea>
      </Card>
    </AppGridItem>
  );
};

const Files: React.FC<{ data: IDirState }> = ({ data }) => {
  const path = useGhPath();
  return (
    <Container>
      <Grid container spacing={1} justifyContent="flex-start">
        {path !== '' && <ReturnToParent />}
        {data.data.map((file) => (
          <AppGridItem key={file.sha.concat(file.name)}>
            <File file={file} />
          </AppGridItem>
        ))}
        <NewFolderOrFile folder />
        <NewFolderOrFile />
      </Grid>
    </Container>
  );
};

export default Files;
