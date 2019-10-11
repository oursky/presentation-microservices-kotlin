import Product from "./Product";

export interface LoginResult {
  userId?: number;
  accessToken?: string;
  error?: string;
}

export interface RegisterResult {
  userId?: number;
  accessToken?: string;
  error?: string;
}

export interface ListProductResult {
  products: Array<Product>;
}

export interface AddProductResult {
  error?: string;
  productId: number;
}
