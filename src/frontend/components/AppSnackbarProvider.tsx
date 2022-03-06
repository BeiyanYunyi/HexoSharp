/* eslint-disable react/no-unstable-nested-components */
import { Button } from '@mui/material';
import { SnackbarKey, SnackbarProvider } from 'notistack';
import React from 'react';

const AppSnackbarProvider: React.FC = ({ children }) => {
  const notistackRef = React.createRef<SnackbarProvider>();
  const onClickDismiss = (key: SnackbarKey) => () => {
    notistackRef.current?.closeSnackbar(key);
  };
  return (
    <SnackbarProvider
      maxSnack={4}
      preventDuplicate
      ref={notistackRef}
      action={(key) => (
        <Button onClick={onClickDismiss(key)} style={{ color: '#FFF' }}>
          关闭
        </Button>
      )}
    >
      {children}
    </SnackbarProvider>
  );
};

export default AppSnackbarProvider;
