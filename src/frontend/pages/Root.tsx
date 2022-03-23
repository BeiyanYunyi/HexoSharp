import {
  AppBar,
  Backdrop,
  Container,
  IconButton,
  Skeleton,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import globalSnackbar from '../utils/Snackbar';
import ISettings from '../../types/ISettings';
import SiteIcon from '../components/SiteIcon';
import useAppSnackbar from '../hooks/useAppSnackbar';
import { changeAuth } from '../redux/authReducer';
import { changeLoading } from '../redux/loadingReducer';
import { changeLoaded, changeSettings } from '../redux/settingsReducer';
import { useAppDispatch, useAppSelector } from '../redux/store';
import axiosClient from '../service/axiosClient';
import kv from '../service/kv';
import octokit from '../service/octokit';

const Topbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  return (
    <AppBar position="sticky" sx={{ marginBottom: 1 }}>
      <Toolbar>
        <IconButton
          sx={{ marginRight: 1 }}
          onClick={() => {
            dispatch(changeLoading(false));
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
  const snackbar = useAppSnackbar();
  const navigate = useNavigate();
  const loaded = useAppSelector((state) => state.settings.loaded);
  const authed = useAppSelector((state) => state.auth.authed);
  const theme = useTheme();
  /** Differs to `loaded` in `settingsReducer`,
   * it will not block the render of other components. */
  const loading = useAppSelector((state) => state.loading.loading);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    globalSnackbar.changeSnackbar(snackbar);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  React.useEffect(() => {
    (async () => {
      if (loaded && authed) return null;
      const loginRes = await axiosClient.login();
      if (!loginRes) {
        snackbar.info('未登录或登录状态已过期');
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
  }, [dispatch, navigate, authed, loaded, snackbar]);
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
      <Backdrop
        open={loading}
        sx={{ zIndex: theme.zIndex.appBar - 1, backgroundColor: theme.palette.background.paper }}
      >
        <Container>
          <Stack spacing={1}>
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="rectangular" height={118} />
          </Stack>
        </Container>
      </Backdrop>
      <Outlet />
    </>
  );
};

export default Root;
