import React from "react";
import { AlertDialogProps } from "../../interfaces/DialogsProps";
import { Link } from "react-router-dom";
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
  onCloseClick,
  title,
  redirectTo,
  message,
}: AlertDialogProps) {
  return (
    <Dialog
      open={isOpen}
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
        {onCloseClick &&
          (redirectTo !== undefined ? (
            <Link to={redirectTo}>
              <Button fullWidth={true} color="primary" onClick={onCloseClick}>
                Close
              </Button>
            </Link>
          ) : (
            <Button fullWidth={true} color="primary" onClick={onCloseClick}>
              Close
            </Button>
          ))}
      </DialogActions>
    </Dialog>
  );
}
