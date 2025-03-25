import React from "react";
import RouterProvider from "./router/RouterProvider";
import { UserProvider } from "@/entities/user/provider/UserProvider";
import BookProvider from "@/entities/book/provider/BookProvider";

function App(): React.JSX.Element {
  return (
    <BookProvider>
      <UserProvider>
        <RouterProvider />;
      </UserProvider>
    </BookProvider>
  );
}

export default App;
