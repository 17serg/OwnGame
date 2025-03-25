export interface IBook {
  id: number;
  title: string;
  description: string;
  link: string;
  userId: number;
  fileName: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBookCreateData {
  title: string;
  description: string;
  link: string;
  // userId: number;
  fileName?: string;
}

export type BookActionType =
  | { type: 'SET_BOOKS'; payload: IBook[] }
  | { type: 'SET_MYBOOKS'; payload: IBook[] }
  | { type: 'ADD_BOOK'; payload: IBook }
  | { type: 'DELETE_BOOK'; payload: IBook['id'] };

export type BookHandlerType = {
  addHandler: (dataForm: IBookCreateData) => Promise<void>;
  deleteHandler: (id: IBook['id']) => Promise<void>;
};
