import { Button, Card, CardContent, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { changeAuth } from '../redux/authReducer';
import axiosClient from '../service/axiosClient';

const LoginPage = () => {
  const [password, setPassword] = React.useState('');
  const dispatch = useDispatch();
  const location = useLocation();
  const from = (location.state as { from?: { pathname?: string } })?.from?.pathname || '/';
  console.log(from);
  const navigate = useNavigate();
  return (
    <Card>
      <CardContent>
        <Stack>
          <Typography variant="h4" align="center" gutterBottom>
            登录
          </Typography>
          <TextField
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
          <Button
            onClick={async () => {
              const loginRes = await axiosClient.login(password);
              if (!loginRes) return alert('登录失败');
              dispatch(changeAuth(true));
              return navigate(from, { replace: true });
            }}
          >
            登录
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default LoginPage;
