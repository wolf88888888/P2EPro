import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import BooksAction, {CreateBookActionType, RemoveBookActionType} from './actions';
import { fetchedBooksData, failedFetchBooksData, createdBookData, failedCreateBookData, removedBookData, failedRemoveBookData, resetBooksData } from './reducers';
import BookDataService from '../../services/books.service';
import * as BookType from '../../services/types/book.type';

function* getBooksSaga() {
    try {
        yield put(resetBooksData());
        const result: AxiosResponse<Array<BookType.IBookData>> = yield call(() => BookDataService.getAll());
        yield put(fetchedBooksData(result.data));
    } catch (e) {
        yield put(failedFetchBooksData(e)); 
    }
}

function* createBookSaga({title, author}: CreateBookActionType) {
    try {
        yield put(resetBooksData());
        const result: AxiosResponse<BookType.ICreateBookData> = yield call(() => BookDataService.create(title, author));
        yield put(createdBookData({id: result.data.id, title, author}));
    } catch (e) {
        yield put(failedCreateBookData(e));
    }
}

function* removeBookSaga({id}: RemoveBookActionType) {
    try {
        yield put(resetBooksData());
        yield call(() => BookDataService.delete(id));
        yield put(removedBookData({id}));
    } catch (e) {
        yield put(failedRemoveBookData(e));
    }
}

export default function* watchBooks() {
    yield takeLatest(BooksAction.FETCH_BOOKS, getBooksSaga);
    yield takeEvery(BooksAction.CREATE_BOOK, createBookSaga);
    yield takeEvery(BooksAction.REMOVE_BOOK, removeBookSaga);
}
