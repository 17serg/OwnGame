import BookApi from '@/entities/book/api/BookApi';
import { IBook, IBookCreateData } from '@/entities/book/model';
import { IUser } from '@/entities/user/model';
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

  export const loadFavouriteBooksThunk = createAsyncThunk('books/loadFavouriteBooksThunk', () =>
    BookApi.getFavouriteBooks(),
  );

export const addFavouriteThunk = createAsyncThunk(
  'books/addFavouriteThunk',
  async (bookId: IBook['id']) => {
    const data = await BookApi.likeBook(bookId)
     return {data, bookId}
  },
);

export const addReadedThunk = createAsyncThunk(
    'books/addReadedThunk',
    async (bookId: IBook['id']) => {
      const data = await BookApi.readBook(bookId)
       return {data, bookId}
    },
  );

export const deleteBookThunk = createAsyncThunk(
  'books/deleteBookThunk',
  async (bookId: IBook['id']) => {
    await BookApi.deleteBook(bookId);
    return bookId;
  },
);

export const addBookThunk = createAsyncThunk(
  'books/addBookThunk',
  async (formData: IBookCreateData) => {
    // console.log(formData)
    return BookApi.addBook(formData);
  },
);