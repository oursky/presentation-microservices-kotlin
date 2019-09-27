import Product from "./Product";

export default interface Cart {
  [key: string]: Product;
}
