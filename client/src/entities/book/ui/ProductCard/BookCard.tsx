import React, { CSSProperties } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useUser } from "@/entities/user/hooks/useUser";
import { IBook } from "../../model";

const cardStyle: CSSProperties = {
  minWidth: 263,
  maxWidth: 355,
  minHeight: 280,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};
type BookTypeProps = {
  book: IBook;
  deleteHandler: (id: IBook["id"]) => Promise<void>;
};

export default function BookCard({
  book,
  deleteHandler,
}: BookTypeProps): React.JSX.Element {
  const { user } = useUser();
  return (
    <Card sx={cardStyle}>
      <CardContent>
        <Typography variant="h5" component="div">
          {book.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {book.description}
        </Typography>
        <CardMedia component="img" height="194" image={book.link} alt="img" />
      </CardContent>
      <CardActions>
        {user && user.id === book.userId && (
          <Button size="small" onClick={() => deleteHandler(book.id)}>
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
