import { ProductContext } from "@/entities/product/context/ProductContext";
import { useProduct } from "@/entities/product/hooks/useProduct";
import { IProduct } from "@/entities/product/model";
import ProductCard from "@/entities/product/ui/ProductCard/ProductCard";
import { Box, Paper } from "@mui/material";
import React, { useContext } from "react";

export default function ProductList(): React.JSX.Element {
  const products = useContext<IProduct[]>(ProductContext);
  const { deleteHandler } = useProduct();
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
        {products.map((el) => (
          <Box p={1} key={el.id}>
            <ProductCard product={el} deleteHandler={deleteHandler}/>
          </Box>
        ))}
      </Box>
    </Paper>
  );
}
