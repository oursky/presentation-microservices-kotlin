import Product from "./Product";

export interface LoginResult {
  userId: number | undefined;
  accessToken: string | undefined;
  error: string | undefined;
}

export interface RegisterResult {
  userId: number | undefined;
  accessToken: string | undefined;
  error: string | undefined;
}

export interface DeleteProductResult {
  success: boolean;
  error: string | undefined;
}

export interface ListProductResult {
  products: Array<Product>;
}

export interface AddProductResult {
  error: string | undefined;
  productId: number;
}
