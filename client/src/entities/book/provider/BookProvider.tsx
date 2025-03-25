import { useEffect, useReducer } from "react";
// import productReducer from "../context/PostReducer";
// import ProductApi from "../api/ProductApi";
import { IBook, IBookCreateData } from "../model";
import { BookContext, BookContextHandler } from "../context/BookContext";
import bookReducer from "../context/BookReducer";
import BookApi from "../api/BookApi";
// import { ProductContext, ProductContextHandler } from "../context/ProductContext";

function BookProvider({
    children,
  }: {
    children: React.ReactElement;
  }): React.JSX.Element {
    const [initBooks, dispatch] = useReducer(bookReducer, []);
    useEffect(() => {
      BookApi.getBooks()
        .then((data) => dispatch({ type: "SET_BOOKS", payload: data }))
        .catch(console.log);
    }, []);

    // // const [initMyBooks, myDispatch] = useReducer(bookReducer, []);
    // useEffect(() => {
    //   BookApi.getMyBooks()
    //     .then((data) => dispatch({ type: "SET_MYBOOKS", payload: data }))
    //     .catch(console.log);
    // }, []);
  
    const addHandler = async (dataForm: IBookCreateData): Promise<void> => {
      const newBook = await BookApi.addBook(dataForm);
      dispatch({ type: "ADD_BOOK", payload: newBook });
    };
  
    const deleteHandler = async (id: IBook["id"]): Promise<void> => {
      try {
        await BookApi.deleteBook(id);
        dispatch({ type: "DELETE_BOOK", payload: id });
      } catch (error) {
        console.log(error);
      }
    };
  
    return (
      <BookContext.Provider value={initBooks}>
        <BookContextHandler.Provider value={{ addHandler, deleteHandler }}>
          {children}
        </BookContextHandler.Provider>
      </BookContext.Provider>
    );
  }
  export default BookProvider;
  
  