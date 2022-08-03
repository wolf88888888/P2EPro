import { createSlice } from '@reduxjs/toolkit';
import * as BookType from '../../services/types/book.type';

type IBookState = {
    status: string,
    books: BookType.IBookData[],
    error: null,
}

const initialState: IBookState = {
    status: 'none',
    books: [],
    error: null,
};

const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        resetBooksData: (state) => {
            return {
                ...state,
                status: 'loading',
                error: null,
            };
        },
        fetchedBooksData: (state, action) => {
            return {
                ...state,
                status: 'loaded',
                books: action.payload,
            };
        },
        failedFetchBooksData: (state, action) => {
            return {
                ...state,
                status: 'failed',
                error: action.payload,
            };
        },
        createdBookData: (state, action) => {
            return {
                ...state,
                status: 'created',
                books: [...state.books, action.payload],
            };
        },
        failedCreateBookData: (state, action) => {
            return {
                ...state,
                status: 'failed',
                error: action.payload,
            };
        },
        removedBookData: (state, action) => {
            const books = state.books.filter(book => {
                return book.id !== action.payload.id;
            })
            return {
                ...state,
                status: 'removed',
                books,
            };
        },
        failedRemoveBookData: (state, action) => {
            return {
                ...state,
                status: 'failed',
                error: action.payload,
            };
        },
    },
});

export const {
    resetBooksData,
    fetchedBooksData,
    failedFetchBooksData,
    createdBookData,
    failedCreateBookData,
    removedBookData,
    failedRemoveBookData
} = bookSlice.actions;
export const bookReducer = bookSlice.reducer;
