import SaveIcon from '@mui/icons-material/Save';
import { Button, CircularProgress, Container, Stack, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ISettings from '../../types/ISettings';
import kv from '../service/kv';
import defaultSetting from '../utils/defaultSetting';

const SettingPage = () => {
  const [settings, setSettings] = React.useState<ISettings>();
  const navigate = useNavigate();
  useEffect(() => {
    kv.get('settings').then((res) => {
      if (res === null) return setSettings(defaultSetting);
      return setSettings(JSON.parse(res) as ISettings);
    });
  }, []);
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
              setSettings((oriSettings) => ({ ...oriSettings, [key]: e.target.value }));
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
