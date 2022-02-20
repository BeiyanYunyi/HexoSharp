import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Container, IconButton, Skeleton, Stack, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import ISettings from '../../types/ISettings';
import SiteIcon from '../components/SiteIcon';
import { changeAuth } from '../redux/authReducer';
import { changeLoaded, changeSettings } from '../redux/settingsReducer';
import { useAppDispatch, useAppSelector } from '../redux/store';
import axiosClient from '../service/axiosClient';
import kv from '../service/kv';
import octokit from '../service/octokit';

const Topbar = () => {
  const navigate = useNavigate();
  return (
    <AppBar position="sticky" sx={{ marginBottom: 1 }}>
      <Toolbar>
        <IconButton edge="start" color="inherit">
          <MenuIcon />
        </IconButton>
        <IconButton
          sx={{ marginRight: 1 }}
          onClick={() => {
            navigate('/');
          }}
        >
          <SiteIcon />
        </IconButton>
        <Typography variant="h6" sx={{ userSelect: 'none' }}>
          Hexo #
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

const Root = () => {
  const navigate = useNavigate();
  const loaded = useAppSelector((state) => state.settings.loaded);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    (async () => {
      const loginRes = await axiosClient.login();
      if (!loginRes) {
        navigate('/login', { replace: true });
        return dispatch(changeLoaded(true));
      }
      dispatch(changeAuth(true));
      const settings = await kv.get('settings');
      dispatch(changeLoaded(true));
      if (settings === null) return navigate('/settings');
      const parsedSettings = JSON.parse(settings) as ISettings;
      octokit.auth(parsedSettings.ghApiToken);
      return dispatch(changeSettings(parsedSettings));
    })();
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
