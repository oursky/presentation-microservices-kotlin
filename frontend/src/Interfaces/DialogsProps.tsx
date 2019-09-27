import { MouseEventHandler } from "react";

export interface AlertDialogProps {
  title: string | undefined;
  message: string | undefined;
  open: boolean | undefined;
  onCloseClick: MouseEventHandler<unknown> | undefined;
  redirectTo: string | undefined;
}

export interface ConfirmDialogProps {
  title: string | undefined;
  message: string | undefined;
  isOpen: boolean | undefined;
  onClose: MouseEventHandler<unknown> | undefined;
  onOk: () => void;
}
