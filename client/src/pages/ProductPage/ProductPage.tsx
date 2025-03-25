import { useUser } from "@/entities/user/hooks/useUser";
import ProductAddForm from "@/features/ProductAddForm/ProductAddForm";
import ProductList from "@/widgets/ProductList/ProductList";
import React from "react";

export function ProductPage(): React.JSX.Element {
  const { user } = useUser();
  return (
    <>
      {user && <ProductAddForm />}
      <ProductList />
    </>
  );
}
