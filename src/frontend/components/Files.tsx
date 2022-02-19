import { Card, CardContent, CardHeader, Grid } from '@mui/material';
import React from 'react';
import { IFile } from '../../types/GetRepoContentData';
import FileIcon from './FileIcon';

const File: React.FC<{ file: IFile }> = ({ file }) => (
  <Card>
    <CardHeader title={file.name} avatar={<FileIcon name={file.name} type={file.type} />} />
    <CardContent>{file.type}</CardContent>
  </Card>
);

const Files: React.FC<{ files: IFile[] }> = ({ files }) => (
  <Grid container spacing={1}>
    {files.map((file) => (
      <Grid item>
        <File file={file} />
      </Grid>
    ))}
  </Grid>
);

export default Files;
