import { BookContext } from "@/entities/book/context/BookContext";
import { IBook } from "@/entities/book/model";
import BookCard from "@/entities/book/ui/ProductCard/BookCard";
// import { ProductContext } from "@/entities/product/context/ProductContext";
// import { useProduct } from "@/entities/product/hooks/useProduct";
// import { IProduct } from "@/entities/product/model";
// import ProductCard from "@/entities/product/ui/ProductCard/BookCard";
import { Box, Paper } from "@mui/material";
import React, { useContext } from "react";

export default function BookList(): React.JSX.Element {
  const books = useContext<IBook[]>(BookContext);
  // const { deleteHandler } = useProduct();
  return (
    <Paper elevation={0}>
      <Box
        mt={1}
        py={2}
        px={2}
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
      >
        {books.map((el) => (
          <Box p={1} key={el.id}>
            <BookCard book={el} 
            // deleteHandler={deleteHandler}
            />
          </Box>
        ))}
      </Box>
    </Paper>
  );
}
