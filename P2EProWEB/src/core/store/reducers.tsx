import {combineReducers} from 'redux';
import {bookReducer} from './books/reducers';

const appReducer = combineReducers({
  book: bookReducer,
});

export default appReducer;
