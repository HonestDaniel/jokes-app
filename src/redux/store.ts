import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import jokesReducer from './reducers/jokesSlice';

const rootReducer = combineReducers({
    jokesReducer
})

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof rootReducer>
<<<<<<< HEAD
export type AppDispatch = typeof store.dispatch;
=======
export type AppDispatch = typeof store.dispatch;
>>>>>>> 9d90bc6e3cb23ace5b561bba24eac6d6b4e814db
