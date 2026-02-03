import { createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsFromApi } from './actions';

type TIngredientsState = {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: unknown | null | string;
};

export const initialState: TIngredientsState = {
  ingredients: [],
  isLoading: false,
  error: null
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredientsFromApi.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getIngredientsFromApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getIngredientsFromApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      });
  },
  selectors: {
    getIngredients: (state) => state.ingredients,
    getLoading: (state) => state.isLoading
  }
});

export const { getIngredients, getLoading } = ingredientsSlice.selectors;
