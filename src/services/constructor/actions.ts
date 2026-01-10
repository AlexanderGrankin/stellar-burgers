import { createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';

export const makeOrder = createAsyncThunk(
  'orders/makeOrder',
  async (burger: string[], { rejectWithValue }) => {
    try {
      const response = await orderBurgerApi(burger);
      return response;
    } catch (error) {
      return rejectWithValue('Не удалось оформить заказ');
    }
  }
);
