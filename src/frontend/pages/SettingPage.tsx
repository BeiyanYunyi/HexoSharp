import SaveIcon from '@mui/icons-material/Save';
import { Button, CircularProgress, Container, Stack, TextField } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ISettings from '../../types/ISettings';
import { changeSetting, changeSettings } from '../redux/settingsReducer';
import { useAppDispatch, useAppSelector } from '../redux/store';
import kv from '../service/kv';
import defaultSetting from '../utils/defaultSetting';

/** 设置页面 */
const SettingPage = () => {
  const settings = useAppSelector((state) => state.settings.settings);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    kv.get('settings').then((res) => {
      if (res === null) return dispatch(changeSettings(defaultSetting));
      return dispatch(changeSettings(JSON.parse(res) as ISettings));
    });
  }, [dispatch]);
  if (!settings) {
    return <CircularProgress />;
  }
  const settingKeys = Object.keys(settings) as (keyof ISettings)[];
  return (
    <Container>
      <Stack spacing={1}>
        {settingKeys.map((key) => (
          <TextField
            key={key}
            label={key}
            value={settings[key]}
            onChange={(e) => {
              dispatch(changeSetting({ key, value: e.target.value }));
            }}
          />
        ))}
        <Stack spacing={1} direction="row" justifyContent="space-around">
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={async () => {
              await kv.set('settings', JSON.stringify(settings));
              navigate(-1);
            }}
          >
            保存
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};

export default SettingPage;
