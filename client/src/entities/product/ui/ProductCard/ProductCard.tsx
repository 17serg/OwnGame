import React, { CSSProperties } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { IProduct } from "../../model";
import { useUser } from "@/entities/user/hooks/useUser";

const cardStyle: CSSProperties = {
  minWidth: 263,
  maxWidth: 355,
  minHeight: 280,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};
type ProductTypeProps = {
  product: IProduct;
  deleteHandler: (id: IProduct["id"]) => Promise<void>;
};

export default function ProductCard({
  product,
  deleteHandler,
}: ProductTypeProps): React.JSX.Element {
  const { user } = useUser();
  return (
    <Card sx={cardStyle}>
      <CardContent>
        <Typography variant="h5" component="div">
          {product.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {product.desc}
        </Typography>
        <Typography variant="body2">Price: {product.price}$</Typography>
        <CardMedia component="img" height="194" image={product.url} alt="img" />
      </CardContent>
      <CardActions>
        {user && user.id === product.userId && (
          <Button size="small" onClick={() => deleteHandler(product.id)}>
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
