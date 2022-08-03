import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import appReducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: appReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({thunk: false}).concat(sagaMiddleware),
  devTools: true,
});

sagaMiddleware.run(rootSaga);

export type IRootState = ReturnType<typeof store.getState>;

export default store;
