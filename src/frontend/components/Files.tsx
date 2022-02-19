import { Card, CardActionArea, CardHeader, CircularProgress, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import IFile from '../../types/IFile';
import { refreshFiles } from '../redux/ghPathReducer';
import { useAppDispatch, useAppSelector } from '../redux/store';
import FileIcon from './FileIcon';

const File: React.FC<{ file: IFile }> = ({ file }) => {
  const dispatch = useAppDispatch();
  return (
    <Card>
      <CardActionArea
        onClick={() => {
          dispatch(refreshFiles(file.path));
        }}
      >
        <CardHeader title={file.name} avatar={<FileIcon name={file.name} type={file.type} />} />
      </CardActionArea>
    </Card>
  );
};

const ReturnToParent: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const path = useAppSelector((state) => state.ghPath.path);
  const getParentPath = (pathNow: string) => {
    const pathAry = pathNow.split('/');
    pathAry.pop();
    return pathAry.join('/');
  };
  return (
    <Grid item>
      <Card>
        <CardActionArea
          onClick={() => {
            dispatch(refreshFiles(getParentPath(path)));
          }}
        >
          <CardHeader title=".." avatar={<FileIcon name=".." type="dir" />} />
        </CardActionArea>
      </Card>
    </Grid>
  );
};

const Files: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const path = useAppSelector((state) => state.ghPath.path);
  const loading = useAppSelector((state) => state.ghPath.loading);
  const files = useAppSelector((state) => state.ghPath.files);
  useEffect(() => {
    dispatch(refreshFiles(''));
  }, [dispatch]);
  if (loading) return <CircularProgress />;
  return (
    <Grid container spacing={1}>
      {path !== '' && <ReturnToParent />}
      {files.map((file) => (
        <Grid item>
          <File file={file} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Files;
