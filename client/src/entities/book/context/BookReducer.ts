import { BookActionType, IBook } from "../model";

const bookReducer: React.Reducer<IBook[], BookActionType> = (
  state,
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_BOOKS":
      return payload;
    case "ADD_BOOK":
      return [payload, ...state];
    case "DELETE_BOOK":
      return state.filter((el) => el.id !== payload);

    default:
      return state;
  }
};

export default bookReducer;