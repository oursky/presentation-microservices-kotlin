import { MouseEventHandler } from "react";

export default interface PopupBoxProps {
  title: string | undefined;
  message: string | undefined;
  open: boolean | undefined;
  onCloseClick: MouseEventHandler<unknown> | undefined;
  redirectTo: string | undefined;
}
