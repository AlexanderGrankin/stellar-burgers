import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { nanoid } from '@reduxjs/toolkit';
import { makeOrder } from './actions';

type TConstructorState = {
  items: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | undefined | null;
};

const initialState: TConstructorState = {
  items: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null,
  error: null
};

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.items.bun = action.payload;
        } else {
          state.items.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const key = nanoid();
        return { payload: { ...ingredient, id: key } };
      }
    },
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.items.ingredients = state.items.ingredients.filter(
        (item) => item.id !== action.payload.id
      );
    },
    moveIngredientUp: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index > 0) {
        const ingredients = state.items.ingredients;
        [ingredients[index - 1], ingredients[index]] = [
          ingredients[index],
          ingredients[index - 1]
        ];
      }
    },
    moveIngredientDown: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index < state.items.ingredients.length - 1) {
        const ingredients = state.items.ingredients;
        [ingredients[index + 1], ingredients[index]] = [
          ingredients[index],
          ingredients[index + 1]
        ];
      }
    },
    resetBurger: (state) => {
      state.items.bun = null;
      state.items.ingredients = [];
    },
    clearModalData: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(makeOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(makeOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message;
      })
      .addCase(makeOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
        state.items.bun = null;
        state.items.ingredients = [];
        state.error = null;
      });
  },
  selectors: {
    getConstructorItems: (state) => state.items,
    getOrderRequest: (state) => state.orderRequest,
    getOrderModalData: (state) => state.orderModalData
  }
});

export const { getConstructorItems, getOrderRequest, getOrderModalData } =
  constructorSlice.selectors;
export const {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  resetBurger,
  clearModalData
} = constructorSlice.actions;
