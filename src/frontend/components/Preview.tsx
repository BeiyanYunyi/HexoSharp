import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import Vditor from 'vditor';

const Preview: React.FC<{ value: string }> = ({ value }) => {
  const divRef = React.useRef<HTMLDivElement>(null);
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
