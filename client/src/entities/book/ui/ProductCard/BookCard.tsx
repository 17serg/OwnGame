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
import { useAppDispatch } from "@/shared/lib/reduxHooks";
import { addFavouriteThunk, addReadedThunk, deleteBookThunk } from "@/features/bookSlice/thunk";

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
};

export default function BookCard({
  book}: BookTypeProps): React.JSX.Element {
  const dispatch = useAppDispatch()
  const { user } = useUser();
  // console.log(user.id)
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
          <Button size="small" 
          onClick={() => dispatch(deleteBookThunk(book.id))}
          >
            Delete
          </Button>
        )}
                {user && (
          <Button size="small" 
          onClick={() => dispatch(addFavouriteThunk(book.id))}
          >
            {(book && book?.Likes?.find(el=>el.userId===user.id))? "Delete favourite": "Add favourite"}
          </Button>
        )}
                        {user && (
          <Button size="small" 
          onClick={() => dispatch(addReadedThunk(book.id))}
          >
            {(book && book?.Likes?.find(el=>el.userId===user.id && el.isReaded===true))? "Unread": "Add to readed"}
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
