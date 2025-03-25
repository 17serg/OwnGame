import { IProduct, ProductHandlerType } from "@/entities/product/model";
import { createContext } from "react";

export const ProductContext = createContext<IProduct[]>([]);
export const ProductContextHandler = createContext<ProductHandlerType | null>(
  null
);