import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingredientsSlice } from './ingredients/slice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userSlice } from './user/slice';
import { constructorSlice } from './constructor/slice';
import { feedSlice } from './feed/slice';
import { orderSlice } from './orders/slice';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  ingredients: ingredientsSlice.reducer,
  burgerConstructor: constructorSlice.reducer,
  feed: feedSlice.reducer,
  orders: orderSlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
