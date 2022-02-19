import ArticleIcon from '@mui/icons-material/Article';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import FolderIcon from '@mui/icons-material/Folder';
import { Avatar, useTheme } from '@mui/material';
import React from 'react';

const FileIcon: React.FC<{ name: string; type: string }> = ({ name, type }) => {
  const theme = useTheme();
  if (type === 'dir') {
    return (
      <Avatar sx={{ bgcolor: theme.palette.secondary.light }}>
        <FolderIcon />
      </Avatar>
    );
  }
  if (name.endsWith('.md')) {
    return (
      <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
        <ArticleIcon />
      </Avatar>
    );
  }
  return (
    <Avatar>
      <FileOpenIcon sx={{ bgcolor: theme.palette.grey[400] }} />
    </Avatar>
  );
};

export default FileIcon;
