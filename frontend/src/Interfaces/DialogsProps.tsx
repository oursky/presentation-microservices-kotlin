import { MouseEventHandler } from "react";
import Product from "./Product";
import NewProductData from "./NewProductData";

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
  onClose?: MouseEventHandler<unknown>;
  onSubmit?: (id: number, updatedProduct: NewProductData) => () => void;
  isOpen: boolean;
}
