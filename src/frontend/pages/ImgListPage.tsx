/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import CloseIcon from '@mui/icons-material/Close';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Container, IconButton, Stack } from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import React from 'react';
import { version } from '../../../package.json';
import IFile from '../../types/IFile';
import ConfirmDialog, { IConfirmDialogRef } from '../components/ConfirmDialog';
import useImgPathInfo from '../hooks/useImgPathInfo';
import { changeLoading } from '../redux/loadingReducer';
import { useAppDispatch } from '../redux/store';
import lscat from '../service/lscat';
import rm from '../service/rm';
import snackbar from '../utils/Snackbar';

/** 图片集中管理页面 */
const ImgListPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const imgPathInfo = useImgPathInfo();
  const [imgs, setImgs] = React.useState<IFile[]>([]);
  const [img, setImg] = React.useState<IFile | null>(null);
  const dialogRef = React.useRef<IConfirmDialogRef>(null);
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
  }, [dispatch, imgPathInfo.owner, imgPathInfo.repo, imgPathInfo.path]);
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
    <>
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
              <Stack direction="row" justifyContent="space-around">
                <IconButton
                  onClick={() => {
                    setImg(null);
                  }}
                >
                  <CloseIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => {
                    dialogRef.current?.openDialog();
                  }}
                >
                  <DeleteForeverIcon />
                </IconButton>
              </Stack>
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
      <ConfirmDialog
        title="确定要删除吗？"
        ref={dialogRef}
        onConfirm={async () => {
          const res = await rm({
            path: `${imgPathInfo.path ? `${imgPathInfo.path}/` : ''}${img!.name}`,
            sha: img!.sha,
            message: `🗑️ Deleted by Hexo# v${version} at ${new Date().toLocaleString()}`,
            owner: imgPathInfo.owner,
            repo: imgPathInfo.repo,
          });
          console.log(res);
          if (res.status === 200) {
            snackbar.success('删除成功');
            setImgs((oriImgs) => oriImgs.filter((eachImg) => eachImg.sha !== img!.sha));
            setImg(null);
            dialogRef.current?.closeDialog();
          } else {
            snackbar.err('删除失败，请检查 Console');
            setImg(null);
            dialogRef.current?.closeDialog();
          }
          dispatch(changeLoading(true));
        }}
      >
        此操作不可撤回
      </ConfirmDialog>
    </>
  );
};

export default ImgListPage;
