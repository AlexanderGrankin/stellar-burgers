import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrdersFromApi } from './actions';

type TOrderState = {
  orders: TOrder[];
  isLoading: boolean;
  error: null | string | undefined;
};

export const initialState: TOrderState = {
  orders: [],
  isLoading: false,
  error: null
};

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersFromApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrdersFromApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getOrdersFromApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = [...action.payload];
        state.error = null;
      });
  },
  selectors: {
    getOrders: (state) => state.orders,
    getLoading: (state) => state.isLoading
  }
});

export const { getOrders, getLoading } = orderSlice.selectors;
