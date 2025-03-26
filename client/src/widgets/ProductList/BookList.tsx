import BookCard from "@/entities/book/ui/ProductCard/BookCard";import { loadAllBooksThunk } from "@/features/bookSlice/thunk";
import { useAppDispatch, useAppSelector } from "@/shared/lib/reduxHooks";
;
import { Box, Paper } from "@mui/material";
import React, { useEffect } from "react";

export default function BookList(): React.JSX.Element {
  const books = useAppSelector((state) => state.books.books);
  const dispatch = useAppDispatch()
    useEffect(() => {
      void dispatch(loadAllBooksThunk());
    },[])
  // console.log(books)

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
            />
          </Box>
        ))}
      </Box>
    </Paper>
  );
}
