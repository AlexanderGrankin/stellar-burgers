import { getFeedsApi, getOrderByNumberApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getFeedsFromApi = createAsyncThunk(
  'feed/getFeedsFromApi',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getFeedsApi();
      return response;
    } catch (error) {
      return rejectWithValue('Ошибка получения заказов');
    }
  }
);

export const getOrderByNumber = createAsyncThunk(
  'feed/getOrderByNumber',
  async (num: number, { rejectWithValue }) => {
    try {
      const response = await getOrderByNumberApi(num);
      return response;
    } catch (error) {
      return rejectWithValue('Ошибка получения заказов');
    }
  }
);
