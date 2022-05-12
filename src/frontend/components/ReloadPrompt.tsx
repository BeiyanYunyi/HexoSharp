import CloseIcon from '@mui/icons-material/Close';
import UpdateIcon from '@mui/icons-material/Update';
import { Alert, IconButton, Snackbar } from '@mui/material';
import { useRegisterSW } from 'virtual:pwa-register/react';

/** 引入 `Service Worker`，加载完成后显示一个弹窗 */
const ReloadPrompt = () => {
  // replaced dynamically

  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisterError(error) {
      // eslint-disable-next-line no-console
      console.error('SW registration error', error);
    },
  });

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  if (needRefresh) updateServiceWorker(true);

  return (
    <Snackbar
      autoHideDuration={3000}
      open={offlineReady || needRefresh}
      onClose={close}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert
        elevation={6}
        variant="filled"
        severity={needRefresh ? 'info' : 'success'}
        onClose={close}
        action={
          <>
            {needRefresh && (
              <IconButton
                size="small"
                aria-label="更新"
                color="inherit"
                onClick={() => updateServiceWorker(true)}
              >
                <UpdateIcon fontSize="small" />
              </IconButton>
            )}
            <IconButton size="small" aria-label="关闭" color="inherit" onClick={close}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      >
        {offlineReady ? '网页功能已缓存' : '网页功能有更新，点击更新'}
      </Alert>
    </Snackbar>
  );
};

export default ReloadPrompt;
