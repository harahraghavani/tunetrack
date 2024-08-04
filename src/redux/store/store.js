// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { combineReducers } from 'redux';
import MusicReducer from '../reducer/MusicDataReducer';

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    musicData: persistReducer(persistConfig, MusicReducer),
});

const store = configureStore({
    reducer: rootReducer,
});

const persistor = persistStore(store);

export { store, persistor };
