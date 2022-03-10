import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { CardActions, IconButton, Stack } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { version } from '../../../package.json';
import useAppSnackbar from '../hooks/useAppSnackbar';
import useGhPath from '../hooks/useGhPath';
import useParentPath from '../hooks/useParentPath';
import { useAppSelector } from '../redux/store';
import rm from '../service/rm';
import ConfirmDialog, { IConfirmDialogRef } from './ConfirmDialog';

const PreviewActions: React.FC<{ editable?: boolean; sha: string }> = ({ editable, sha }) => {
  const path = useGhPath();
  const parentPath = useParentPath();
  const navigate = useNavigate();
  const location = useLocation();
  const snackbar = useAppSnackbar();
  const settings = useAppSelector((state) => state.settings.settings);
  const editUrl = location.pathname.replace('/ghView/', '/ghEdit/');
  const dialogRef = React.useRef<IConfirmDialogRef>(null);
  return (
    <>
      <CardActions sx={{ justifyContent: 'center' }}>
        <Stack direction="row" spacing={1} justifyContent="space-between" sx={{ width: '100%' }}>
          {editable && (
            <IconButton
              href={editUrl}
              color="primary"
              onClick={(e) => {
                e.preventDefault();
                navigate(editUrl);
              }}
            >
              <EditIcon />
            </IconButton>
          )}
          <IconButton
            color="warning"
            href={`/ghView/${parentPath}`}
            onClick={(e) => {
              e.preventDefault();
              navigate(`/ghView/${parentPath}`);
            }}
          >
            <ArrowBackIcon />
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
      </CardActions>
      <ConfirmDialog
        title="确定要删除吗？"
        ref={dialogRef}
        onConfirm={async () => {
          const res = await rm({
            path,
            sha,
            message: `🗑️ Deleted by Hexo# v${version} at ${new Date().toLocaleString()}`,
            owner: settings.owner,
            repo: settings.repo,
          });
          console.log(res);
          if (res.status === 200) {
            snackbar.success('删除成功');
            dialogRef.current?.closeDialog();
            navigate(parentPath, { replace: true });
          }
        }}
      >
        此操作不可撤回
      </ConfirmDialog>
    </>
  );
};

export default PreviewActions;
