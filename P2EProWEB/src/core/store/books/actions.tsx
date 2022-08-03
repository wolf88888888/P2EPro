enum BooksAction {
    FETCH_BOOKS = 'BOOKS::FETCH',
    CREATE_BOOK = 'BOOKS::CREATE',
    REMOVE_BOOK = 'BOOKS::REMOVE',
}

export interface CreateBookActionType {
    type: typeof BooksAction.CREATE_BOOK;
    title: string;
    author: string;
}

export interface RemoveBookActionType {
    type: typeof BooksAction.REMOVE_BOOK;
    id: string;
}

export default BooksAction;

export type BooksActionType =
  | CreateBookActionType
  | RemoveBookActionType