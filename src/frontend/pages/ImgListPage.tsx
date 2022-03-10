import { Container } from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import React from 'react';
import IFile from '../../types/IFile';
import useAppSnackbar from '../hooks/useAppSnackbar';
import useImgPathInfo from '../hooks/useImgPathInfo';
import { changeLoading } from '../redux/loadingReducer';
import { useAppDispatch } from '../redux/store';
import lscat from '../service/lscat';

const ImgListPage: React.FC = () => {
  const snackbar = useAppSnackbar();
  const dispatch = useAppDispatch();
  const imgPathInfo = useImgPathInfo();
  const [loaded, setLoaded] = React.useState(false);
  const [imgs, setImgs] = React.useState<IFile[]>([]);
  React.useEffect(() => {
    dispatch(changeLoading(true));
    if (!loaded) {
      lscat(imgPathInfo)
        .then((res) => {
          if (res?.type === 'dir') {
            setImgs(res.data);
            setLoaded(true);
            dispatch(changeLoading(false));
          }
        })
        .catch((e) => {
          setLoaded(true);
          snackbar.err('运行出错，请检查 Console');
          console.error(e);
        });
    }
  }, [imgPathInfo, snackbar, loaded, dispatch]);
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
