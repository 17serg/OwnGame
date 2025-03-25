import { IProduct, ProductActionType } from "@/entities/product/model";

const productReducer: React.Reducer<IProduct[], ProductActionType> = (
  state,
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_PRODUCTS":
      return payload;
    case "ADD_PRODUCT":
      return [payload, ...state];
    case "DELETE_PRODUCT":
      return state.filter((el) => el.id !== payload);

    default:
      return state;
  }
};

export default productReducer;