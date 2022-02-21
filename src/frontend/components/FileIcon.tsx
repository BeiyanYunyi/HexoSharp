import ArticleIcon from '@mui/icons-material/Article';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import AddIcon from '@mui/icons-material/Add';
import FolderIcon from '@mui/icons-material/Folder';
import { Avatar, colors, useTheme } from '@mui/material';
import React from 'react';

const FileIcon: React.FC<{ name: string; type: string }> = ({ name, type }) => {
  const theme = useTheme();
  switch (type) {
    case 'dir':
      return (
        <Avatar sx={{ bgcolor: theme.palette.secondary.light }}>
          <FolderIcon />
        </Avatar>
      );
    case 'newDir':
      return (
        <Avatar sx={{ bgcolor: colors.green[400] }}>
          <CreateNewFolderIcon />
        </Avatar>
      );
    case 'newFile':
      return (
        <Avatar sx={{ bgcolor: colors.green[400] }}>
          <AddIcon />
        </Avatar>
      );
    default:
      break;
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
      <InsertDriveFileIcon sx={{ bgcolor: theme.palette.grey[400] }} />
    </Avatar>
  );
};

export default FileIcon;
