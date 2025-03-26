import { IBook } from '@/entities/book/model';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { deleteBookThunk, loadAllBooksThunk, loadUserBooksThunk } from './thunk';
// import type { PlaceT, UserWithPlacesT } from '../../entities/place/model/types';;

export type BookState = {
  books: IBook[];
  usersBooks: IBook[];
  likedUsersBooks: IBook[];
  //   sort: {
  //     key: 'order' | 'name';
  //     order: 'asc' | 'desc';
  //   };
  //   orderedPlaces: PlaceT[];
  isLoadingBooks: boolean;
};

const initialState: BookState = {
  books: [],
  usersBooks: [],
  likedUsersBooks: [],
  //   sort: {
  //     key: 'order',
  //     order: 'asc',
  //   },
  //   orderedPlaces: [],
  isLoadingBooks: false,
};

// function applySort(state: RoadmapState): void {
//   state.orderedPlaces = state.oneUserPlaces.toSorted((a, b) => {
//     if (state.sort.key === 'order') {
//       return state.sort.order === 'asc' ? a.order - b.order : b.order - a.order;
//     }
//     return state.sort.order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
//   });
// }

export const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    // changeSort: (state, action: PayloadAction<'order' | 'name'>) => {
    //   if (state.sort.key === action.payload) {
    //     state.sort.order = state.sort.order === 'asc' ? 'desc' : 'asc';
    //   } else {
    //     state.sort.key = action.payload;
    //     state.sort.order = 'asc';
    //   }
    //   applySort(state);
    //   //   state.orderedPlaces = state.oneUserPlaces.toSorted((a, b) => {
    //   //     if (state.sort.key === 'order') {
    //   //       return state.sort.order === 'asc' ? a.order - b.order : b.order - a.order;
    //   //     }
    //   //     return state.sort.order === 'asc'
    //   //       ? a.name.localeCompare(b.name)
    //   //       : b.name.localeCompare(a.name);
    //   //   });
    // },
    // clearUserPlaces: (state) => {
    //   state.oneUserPlaces = [];
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAllBooksThunk.fulfilled, (state, action) => {
        state.books = action.payload;
        state.isLoadingBooks = false;
      })
      .addCase(loadAllBooksThunk.pending, (state) => {
        state.isLoadingBooks = true;
      })
      .addCase(loadAllBooksThunk.rejected, (state) => {
        state.isLoadingBooks = false;
      })
      .addCase(loadUserBooksThunk.fulfilled, (state, action) => {
        state.usersBooks = action.payload;
        state.isLoadingBooks = false;
      })
      .addCase(loadUserBooksThunk.pending, (state) => {
        state.isLoadingBooks = true;
      })
      .addCase(loadUserBooksThunk.rejected, (state) => {
        state.isLoadingBooks = false;
      })
      //       .addCase(loadUserRoadmapThunk.fulfilled, (state, action) => {
      //         state.oneUserPlaces = action.payload;
      //         applySort(state);
      //       })
      .addCase(deleteBookThunk.fulfilled, (state, action) => {
        const targetBook = state.books.find((book) => book.id === action.payload);
        if (!targetBook) return;
        state.books = state.books.filter((book) => book.id !== action.payload);
        state.usersBooks = state.usersBooks.filter((book) => book.id !== action.payload);
        state.likedUsersBooks = state.likedUsersBooks.filter((book) => book.id !== action.payload);
        // .toSorted((a, b) => a.order - b.order)
      });
    //       .addCase(addPlaceThunk.rejected, (state, action) => {
    //         console.log(action.error);
    //       });
  },
});

// Action creators are generated for each case reducer function
// export const { changeSort, clearUserPlaces } = bookSlice.actions;

export default bookSlice.reducer;
