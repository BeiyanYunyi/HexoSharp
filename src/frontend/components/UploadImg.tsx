import { Card, CardActionArea, CardHeader } from '@mui/material';
import React from 'react';
import { version } from '../../../package.json';
import useAppSnackbar from '../hooks/useAppSnackbar';
import useGhPath from '../hooks/useGhPath';
import { useAppSelector } from '../redux/store';
import createOrUpdate from '../service/createOrUpdate';
import AppGridItem from './AppGridItem';
import FileIcon from './FileIcon';

const UploadImg: React.FC = () => {
  const settings = useAppSelector((state) => state.settings.settings);
  const path = useGhPath();
  const snackbar = useAppSnackbar();
  const reader = new FileReader();
  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const resStr = reader.result!.toString();
      const content = resStr.substring(resStr.indexOf(',') + 1);
      const targetPath = (() => {
        if (path !== '') return `${path}/${file.name}`;
        return file.name;
      })();
      const res = await createOrUpdate({
        path: targetPath,
        content,
        message: `➕ Uploaded by Hexo# v${version} at ${new Date().toLocaleString()}`,
        owner: settings.owner,
        repo: settings.repo,
      });
      console.log(res);
      if (res.status.toString().startsWith('2')) snackbar.success('上传成功');
    };
  };
  return (
    <AppGridItem>
      <form>
        <Card>
          <label aria-controls="form" htmlFor="upload-file">
            <input
              onChange={handleSubmit}
              accept="image/*"
              id="upload-file"
              style={{ display: 'none' }}
              type="file"
            />
            <CardActionArea component="span">
              <CardHeader title="上传图片" avatar={<FileIcon name="+" type="uploadImg" />} />
            </CardActionArea>
          </label>
        </Card>
      </form>
    </AppGridItem>
  );
};

export default UploadImg;
