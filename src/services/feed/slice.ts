import { createSlice, isAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeedsFromApi, getOrderByNumber } from './actions';

type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: unknown | null | string;
  modal: TOrder | null;
};

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null,
  modal: null
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeedsFromApi.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeedsFromApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getFeedsFromApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      });
    builder
      .addCase(getOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.modal = action.payload.orders[0];
      });
  },
  selectors: {
    getFeedOrders: (state) => state.orders,
    getTotal: (state) => state.total,
    getTotalToday: (state) => state.totalToday,
    getLoading: (state) => state.isLoading,
    getFeedModal: (state) => state.modal
  }
});

export const {
  getFeedOrders,
  getTotal,
  getTotalToday,
  getLoading,
  getFeedModal
} = feedSlice.selectors;
