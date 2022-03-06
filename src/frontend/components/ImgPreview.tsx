import { Card } from '@mui/material';
import React from 'react';
import PreviewActions from './PreviewActions';

const ImgPreview: React.FC<{ sha: string; url: string; filename: string }> = ({
  sha,
  url,
  filename,
}) => {
  const src = `/api/gh/${url}`;
  return (
    <Card>
      <PreviewActions sha={sha} />
      <img src={src} alt={filename} id="preview" />
    </Card>
  );
};

export default ImgPreview;
