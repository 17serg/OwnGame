import React from "react";
import BookList from "@/widgets/ProductList/BookList";


export function MainPage(): React.JSX.Element {
  // const { user } = useUser();
  return (
    <>
      {/* {user && <ProductAddForm />} */}
      <BookList />
    </>
  );
}
