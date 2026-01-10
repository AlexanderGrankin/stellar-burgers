import { getIngredientsApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getIngredientsFromApi = createAsyncThunk(
  'ingredients/getIngredientsFromApi',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getIngredientsApi();
      return response;
    } catch (error) {
      return rejectWithValue('Ошибка получения данных об ингредиентах');
    }
  }
);
