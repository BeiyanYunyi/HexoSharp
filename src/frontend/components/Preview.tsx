import { Card, CardContent, Container, Typography } from '@mui/material';
import React from 'react';
import Vditor from 'vditor';
import PreviewActions from './PreviewActions';

const Preview: React.FC<{ value: string; sha: string }> = ({ value, sha }) => {
  const divRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (divRef.current) {
      Vditor.preview(divRef.current, value, {
        icon: 'material',
        mode: 'light',
        markdown: { autoSpace: true, fixTermTypo: true, toc: true },
      });
    }
  }, [value]);
  return (
    <Container>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vditor/dist/index.css" />
      <Card>
        <PreviewActions editable sha={sha} />
        <CardContent>
          <Typography component="div" ref={divRef}>
            预览正在加载中
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Preview;
