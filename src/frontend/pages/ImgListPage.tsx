/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { Container, Stack, Button } from '@mui/material';
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
  const [img, setImg] = React.useState<IFile | null>(null);
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
  const rows: GridRowsProp = imgs.map((item) => ({
    id: item.sha + item.name,
    col1: item.name,
    col2: item.size,
    info: item,
  }));
  return (
    <Container>
      <Stack sx={{ height: '100vh' }} spacing={1}>
        {img && (
          <>
            <Stack direction="row" justifyContent="center" sx={{ maxHeight: '50%' }}>
              <img
                src={`${window.location.origin}/api/gh/${img.download_url}`}
                alt="imgPreviewer"
                height="100%"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  window.open(`${window.location.origin}/api/gh/${img.download_url}`);
                }}
              />
            </Stack>
            <Button
              variant="outlined"
              onClick={() => {
                setImg(null);
              }}
            >
              取消选择
            </Button>
          </>
        )}
        <div style={{ flexGrow: '1', width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            onRowClick={(e) => {
              setImg(e.row.info);
            }}
          />
        </div>
      </Stack>
    </Container>
  );
};

export default ImgListPage;
