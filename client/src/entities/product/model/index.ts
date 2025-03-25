export interface IProduct {
  id: number;
  title: string;
  price: number;
  desc: string;
  url: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProductCreateData {
  title: string;
  price: number;
  desc: string;
  url: string;
}

export type ProductActionType =
  | { type: "SET_PRODUCTS"; payload: IProduct[] }
  | { type: "ADD_PRODUCT"; payload: IProduct }
  | { type: "DELETE_PRODUCT"; payload: IProduct["id"] };

export type ProductHandlerType = {
  addHandler: (dataForm: IProductCreateData) => Promise<void>;
  deleteHandler: (id: IProduct["id"]) => Promise<void>;
};
