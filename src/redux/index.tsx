import { applyMiddleware, compose, createStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
//import storage from 'redux-persist/lib/storage';
import storage from 'redux-persist/lib/storage/session';
// import storage from '@react-native-async-storage/async-storage';
import rootSaga from './ducks/rootSaga';
import rootReducer from './ducks/rootReducer';

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
    key: 'vm-pay-redux',
    storage,
    whitelist: ['token', 'profile']
}

const reducer = persistReducer(persistConfig, rootReducer);

const store = createStore(reducer, compose(applyMiddleware(sagaMiddleware)));

const _persistStore = persistStore(store);

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default { store, _persistStore }