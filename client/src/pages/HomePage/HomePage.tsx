import { ProductContext } from "@/entities/product/context/ProductContext";
import { IProduct } from "@/entities/product/model";
import React, { useContext } from "react";

export function HomePage(): React.JSX.Element {
  const products = useContext<IProduct[]>(ProductContext);
  return (
    <div style={{ fontSize: "24px", margin: "20px" }}>
      Всего продуктов:{products.length}
    </div>
  );
}
