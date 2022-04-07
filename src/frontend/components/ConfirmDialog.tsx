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
  /** 对话框标题 */
  title: string;
  /** 当用户点击确认时执行的回调，默认为直接关闭对话框 */
  onConfirm?: () => unknown | Promise<unknown>;
  /** 当用户点击取消时执行的回调，默认为直接关闭对话框 */
  onCancel?: () => unknown | Promise<unknown>;
  children?: React.ReactNode | undefined;
}

/** 确认对话框的 Ref，控制它的开关 */
export interface IConfirmDialogRef {
  openDialog: () => void;
  closeDialog: () => void;
}

/** 确认对话框，各参数的说明参见各参数 */
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
