import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React from 'react';

interface IConfirmDialogProps {
  title: string;
  onConfirm?: () => unknown | Promise<unknown>;
  onCancel?: () => unknown | Promise<unknown>;
  children?: React.ReactNode | undefined;
}

export interface IConfirmDialogRef {
  openDialog: () => void;
  closeDialog: () => void;
}

const ConfirmDialog = React.forwardRef(
  ({ onConfirm, onCancel, title, children }: IConfirmDialogProps, ref) => {
    const [open, setOpen] = React.useState(false);
    const openDialog = () => setOpen(true);
    const closeDialog = () => setOpen(false);
    React.useImperativeHandle(ref, () => ({ openDialog, closeDialog }));
    return (
      <Dialog open={open} onClose={onCancel || closeDialog}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{children}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel || closeDialog} color="error">
            取消
          </Button>
          <Button onClick={onConfirm || closeDialog} color="primary">
            确认
          </Button>
        </DialogActions>
      </Dialog>
    );
  },
);

export default ConfirmDialog;
