import { getOrdersApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getOrdersFromApi = createAsyncThunk(
  'orders/getOrdersFromApi',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getOrdersApi();
      return response;
    } catch (error) {
      return rejectWithValue('Ошибка получения данных о заказах');
    }
  }
);
