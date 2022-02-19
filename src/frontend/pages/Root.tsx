import { AppBar, Container, Skeleton, Stack, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { changeSettings, changeLoaded } from '../redux/settingsReducer';
import { useAppDispatch, useAppSelector } from '../redux/store';
import kv from '../service/kv';

const Topbar = () => (
  <AppBar position="sticky" sx={{ marginBottom: 1 }}>
    <Toolbar>
      <Typography variant="h6" sx={{ userSelect: 'none' }}>
        Hexo #
      </Typography>
    </Toolbar>
  </AppBar>
);

const Root = () => {
  const navigate = useNavigate();
  const loaded = useAppSelector((state) => state.settings.loaded);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    kv.get('settings').then((res) => {
      dispatch(changeLoaded(true));
      if (res === null) return navigate('/settings');
      return dispatch(changeSettings(JSON.parse(res)));
    });
  }, [dispatch, navigate]);
  if (!loaded) {
    return (
      <>
        <Topbar />
        <Container>
          <Stack spacing={1}>
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="rectangular" height={118} />
          </Stack>
        </Container>
      </>
    );
  }
  return (
    <>
      <Topbar />
      <Outlet />
    </>
  );
};

export default Root;
