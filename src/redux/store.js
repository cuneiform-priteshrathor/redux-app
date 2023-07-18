import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { rootReducer } from "./rootReducer";


const persistConfig = {
    key: "auth",
    storage: storage,
    whitelist: ["auth"],
    blacklist: []
}

const pReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: pReducer,
    middleware: [thunk]
})

const persistor = persistStore(store);

export { store, persistor }