import { orderSlice, initialState } from './slice';
import { getOrdersFromApi } from './actions';
import { TOrder } from '@utils-types';

const { reducer } = orderSlice;

describe('orderSlice reducer', () => {
  const mockOrders: TOrder[] = [
    { _id: '1', ingredients: ['ing-1'], status: 'done', name: 'Бургер 1', createdAt: '', updatedAt: '', number: 1001 },
    { _id: '2', ingredients: ['ing-2', 'ing-3'], status: 'created', name: 'Бургер 2', createdAt: '', updatedAt: '', number: 1002 }
  ];

  test('isLoading должно устанавливаться на true во время загрузки', () => {
    const action = { type: getOrdersFromApi.pending.type };
    const state = reducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
    expect(state.orders).toEqual([]);
  });

  test('после завершения загрузки, isLoading должно установиться на false', () => {
    const action = {
      type: getOrdersFromApi.fulfilled.type,
      payload: mockOrders
    };
    const state = reducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.orders).toEqual(mockOrders);
  });

  test('при ошибке загрузки, isLoading должно установиться на false', () => {
    const errorMessage = 'Network Error';
    const action = {
      type: getOrdersFromApi.rejected.type,
      error: { message: errorMessage }
    };
    const state = reducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(errorMessage);
    expect(state.orders).toEqual([]);
  });
});