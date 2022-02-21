import { Button, Card, CardActions, CardContent, Stack, Typography } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Vditor from 'vditor';

const Preview: React.FC<{ value: string }> = ({ value }) => {
  const divRef = React.useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const editUrl = location.pathname.replace('/ghView/', '/ghEdit/');
  React.useEffect(() => {
    if (divRef.current) {
      Vditor.preview(divRef.current, value, {
        icon: 'material',
        mode: 'light',
      });
    }
  }, [value]);
  return (
    <>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vditor/dist/index.css" />
      <Card>
        <CardActions>
          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              href={editUrl}
              onClick={(e) => {
                e.preventDefault();
                navigate(editUrl, { replace: true });
              }}
            >
              编辑
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                navigate(-1);
              }}
            >
              返回
            </Button>
          </Stack>
        </CardActions>
        <CardContent>
          <Typography component="div" ref={divRef}>
            预览正在加载中
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default Preview;
