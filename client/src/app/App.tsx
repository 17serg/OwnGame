import React from "react";
import RouterProvider from "./router/RouterProvider";
import { UserProvider } from "@/entities/user/provider/UserProvider";
import ProductProvider from "@/entities/product/provider/ProductProvider";

function App(): React.JSX.Element {
  return (
    <ProductProvider>
      <UserProvider>
        <RouterProvider />;
      </UserProvider>
    </ProductProvider>
  );
}

export default App;
