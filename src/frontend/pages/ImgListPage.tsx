import { Container } from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import React from 'react';
import IFile from '../../types/IFile';
import useImgPathInfo from '../hooks/useImgPathInfo';
import { changeLoading } from '../redux/loadingReducer';
import { useAppDispatch } from '../redux/store';
import lscat from '../service/lscat';
import snackbar from '../utils/Snackbar';

const ImgListPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const imgPathInfo = useImgPathInfo();
  const [imgs, setImgs] = React.useState<IFile[]>([]);
  React.useEffect(() => {
    dispatch(changeLoading(true));
    lscat({ owner: imgPathInfo.owner, repo: imgPathInfo.repo, path: imgPathInfo.path })
      .then((res) => {
        if (res?.type === 'dir') {
          setImgs(res.data);
          dispatch(changeLoading(false));
        }
      })
      .catch((e) => {
        snackbar.err('运行出错，请检查 Console');
        console.error(e);
      });
  }, [imgPathInfo.owner, imgPathInfo.repo, imgPathInfo.path, dispatch]);
  const columns: GridColDef[] = [
    { field: 'col1', headerName: '图片名', flex: 2 },
    { field: 'col2', headerName: '大小', flex: 1 },
  ];
  const rows: GridRowsProp = imgs.map((img) => ({
    id: img.sha + img.name,
    col1: img.name,
    col2: img.size,
    url: img.download_url,
  }));
  return (
    <Container>
      <div style={{ height: '80vh', width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          onRowClick={(e) => {
            console.log(e);
          }}
        />
      </div>
    </Container>
  );
};

export default ImgListPage;
