import { BookContext } from "@/entities/book/context/BookContext";
import { useBooks } from "@/entities/book/hooks/useBooks";
import { IBook } from "@/entities/book/model";
import BookCard from "@/entities/book/ui/ProductCard/BookCard";;
import { Box, Paper } from "@mui/material";
import React, { useContext, useEffect } from "react";

export default function BookList(): React.JSX.Element {
  
  const books = useContext<IBook[]>(BookContext);
  console.log(books)
    const {BooksHandler} = useBooks()
    useEffect(() => {
      BooksHandler();
    },[])
  const { deleteHandler } = useBooks();
  const {favouriteHandler} = useBooks()
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
            deleteHandler={deleteHandler}
            favouriteHandler={favouriteHandler}
            />
          </Box>
        ))}
      </Box>
    </Paper>
  );
}
