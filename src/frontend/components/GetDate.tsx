import { IconButton, Container, Typography, Stack } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import React, { useState } from 'react';
import snackbar from '../utils/Snackbar';

const GetDate: React.FC = () => {
  const [date, setDate] = useState<Date | null>(null);
  const refreshDate = () => {
    setDate(new Date());
  };
  const copyDate = async () => {
    try {
      window.navigator.clipboard.writeText(date!.toJSON());
      snackbar.success('已复制到剪贴板');
    } catch (e) {
      snackbar.err('复制失败');
    }
  };
  return (
    <Container>
      <Stack direction="row" sx={{ marginBottom: 1 }}>
        {date ? (
          <>
            <Stack justifyContent="center">
              <Typography>{date.toJSON()}</Typography>
            </Stack>
            <IconButton onClick={refreshDate}>
              <RefreshIcon />
            </IconButton>
            <IconButton onClick={copyDate}>
              <ContentCopyIcon />
            </IconButton>
          </>
        ) : (
          <IconButton onClick={refreshDate}>
            <AccessTimeIcon />
          </IconButton>
        )}
      </Stack>
    </Container>
  );
};

export default GetDate;
