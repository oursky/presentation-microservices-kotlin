import { MouseEventHandler } from "react";
import Product from "./Product";

export interface AlertDialogProps {
  title: string;
  message: string;
  isOpen: boolean;
  onCloseClick?: MouseEventHandler<unknown>;
  redirectTo?: string;
}

export interface ConfirmDialogProps {
  title: string;
  message: string;
  isOpen: boolean;
  onClose?: MouseEventHandler<unknown>;
  onOk?: () => void;
}

export interface UpdateProductDialogProps {
  product: Product;
  onSubmit?: () => void;
  onClose?: MouseEventHandler<unknown>;
  isOpen: boolean;
}
