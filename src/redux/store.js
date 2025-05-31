import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "./slices/locationSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  location: locationReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

/**
 * Redux store configuration using @reduxjs/toolkit's configureStore
 * 
 * @constant {Object} store - The configured Redux store instance
 * @property {Function} reducer - The persisted root reducer for the store
 * @property {Function} middleware - Custom middleware configuration
 *    - Disables serializable check to allow non-serializable values
 *    - Uses default middleware from Redux Toolkit
 * 
 * @example
 * import { store } from './store';
 * // Use store in Provider
 * <Provider store={store}>
 *   <App />
 * </Provider>
 */
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
