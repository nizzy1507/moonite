import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import gamesReducer from './gamesSlice';
import detailReducer from './detailSlice';

const store = configureStore({
  reducer: {
    games: gamesReducer,
    detail: detailReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
