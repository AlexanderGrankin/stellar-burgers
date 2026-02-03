import { ingredientsSlice, initialState } from './slice'; 
import { getIngredientsFromApi } from './actions';
import { TIngredient } from '@utils-types';

const { reducer } = ingredientsSlice;

describe('ingredientsSlice reducer', () => {
  const mockIngredients: TIngredient[] = [
    {
      _id: '1',
      name: 'Булка',
      type: 'bun',
      proteins: 10,
      fat: 5,
      carbohydrates: 20,
      calories: 100,
      price: 50,
      image: '',
      image_mobile: '',
      image_large: ''
    },
    {
      _id: '2',
      name: 'Соус',
      type: 'sauce',
      proteins: 5,
      fat: 3,
      carbohydrates: 10,
      calories: 50,
      price: 30,
      image: '',
      image_mobile: '',
      image_large: ''
    }
  ];

  test('isLoading должно устанавливаться на true во время загрузки', () => {
    const action = { type: getIngredientsFromApi.pending.type };
    const state = reducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
    expect(state.ingredients).toEqual([]);
  });

  test('после завершения загрузки, isLoading должно установиться на false', () => {
    const action = {
      type: getIngredientsFromApi.fulfilled.type,
      payload: mockIngredients
    };
    const state = reducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.ingredients).toBe(mockIngredients);
  });

  test('при ошибке загрузки, isLoading должно установиться на false', () => {
    const errorMessage = 'Ошибка получения данных об ингредиентах';
    const action = {
      type: getIngredientsFromApi.rejected.type,
      payload: errorMessage
    };
    const state = reducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(errorMessage);
    expect(state.ingredients).toEqual([]);
  });
});