import React from "react";
import { ConfirmDialogProps } from "../../interfaces/DialogsProps";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core/";

export default function MyDialog({
  isOpen,
  title,
  onOk,
  onClose,
  message,
}: ConfirmDialogProps) {
  return (
    <Dialog
      open={!!isOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button fullWidth={true} color="primary" onClick={onOk}>
          OK
        </Button>
        <Button fullWidth={true} color="primary" onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
