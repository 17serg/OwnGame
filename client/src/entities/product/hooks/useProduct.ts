import { useContext } from "react";
import { ProductHandlerType } from "../model";
import { ProductContextHandler } from "../context/ProductContext";

export const useProduct = (): ProductHandlerType => {
    const handlers = useContext(ProductContextHandler);
    if (!handlers) {
      throw new Error('no handlers context');
    }
    return handlers;
  };