import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducers from "./userReducers/userSlice";
import themeReducer from './theme/themeSlice';
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from 'redux-persist'


const rootReducers = combineReducers({
    user: userReducers,
    theme:themeReducer
});

const persistConfig={
    key:'root',
    storage,
    version:1
}

const persistedReducer=persistReducer(persistConfig,rootReducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor=persistStore(store);
