import HCaptcha from '@hcaptcha/react-hcaptcha';
import { Button, Card, CardContent, Container, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeAuth } from '../redux/authReducer';
import axiosClient from '../service/axiosClient';
import snackbar from '../utils/Snackbar';

/** 登录页面，当前存在登录后需手动刷新的 BUG */
const LoginPage = () => {
  const [password, setPassword] = React.useState('');
  const [token, setToken] = React.useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Container maxWidth="xs">
      <Card>
        <CardContent>
          <Stack spacing={1}>
            <Typography variant="h4" align="center">
              登录
            </Typography>
            <Typography variant="caption" align="center">
              首次登录相当于注册
            </Typography>
            <TextField
              label="密码"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
            />
            <Stack direction="row" justifyContent="center">
              <HCaptcha
                sitekey="9480b5ca-9adc-4e78-b0f2-1f20fbdacd0b"
                onVerify={(tok) => setToken(tok)}
                reCaptchaCompat={false}
              />
            </Stack>
            <Button
              variant="contained"
              onClick={async () => {
                const loginRes = await axiosClient.login({ password, token });
                if (!loginRes) return snackbar.err('登录失败');
                dispatch(changeAuth(true));
                return navigate('/', { replace: true });
              }}
            >
              登录
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
};

export default LoginPage;
