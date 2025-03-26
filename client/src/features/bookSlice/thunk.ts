import BookApi from '@/entities/book/api/BookApi';
import { IBook } from '@/entities/book/model';
import { createAsyncThunk } from '@reduxjs/toolkit';
// import placeService from '../../entities/place/api/service';
// import { addPlaceSchema } from '../../entities/place/model/schema';
// import type { PlaceT } from '../../entities/place/model/types';
// import userService from '../../entities/user/api/service';
// import type { UserT } from '../../entities/user/model/types';

export const loadAllBooksThunk = createAsyncThunk('books/loadAllBooksThunk', () =>
  BookApi.getBooks(),
);

export const loadUserBooksThunk = createAsyncThunk('books/loadUserBooksThunk', () =>
    BookApi.getMyBooks(),
  );

// export const loadUserRoadmapThunk = createAsyncThunk(
//   'roadmaps/loadUserRoadmapThunk',
//   (userId: UserT['id']) => placeService.getPlacesByUserId(userId),
// );

export const addFavouriteThunk = createAsyncThunk(
  'books/addFavouriteThunk',
  async (bookId: IBook['id']) => {
    return BookApi.likeBook(bookId)
  },
);

export const deleteBookThunk = createAsyncThunk(
  'books/deleteBookThunk',
  async (bookId: IBook['id']) => {
    await BookApi.deleteBook(bookId);
    return bookId;
  },
);

// export const addPlaceThunk = createAsyncThunk(
//   'roadmaps/addPlaceThunk',
//   async (formData: FormData) => {
//     const data = addPlaceSchema.parse(Object.fromEntries(formData));
//     return placeService.createPlace(data, Number(data.userId));
//   },
// );