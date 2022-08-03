import {all} from 'redux-saga/effects';
import watchBooks from './books/sagas';

export default function* rootSaga() {
  yield all([watchBooks()]);
}
