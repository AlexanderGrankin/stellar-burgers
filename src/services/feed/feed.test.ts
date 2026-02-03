import { feedSlice, initialState } from './slice'; 
import { getFeedsFromApi, getOrderByNumber } from './actions';
import { TOrder } from '@utils-types';

const { reducer } = feedSlice;

describe('feedSlice reducer', () => {
  const mockOrders: TOrder[] = [
    { _id: '1', ingredients: ['ing-1', 'ing-2'], status: 'done', name: 'Бургер 1', createdAt: '', updatedAt: '', number: 1001 },
    { _id: '2', ingredients: ['ing-3'], status: 'pending', name: 'Бургер 2', createdAt: '', updatedAt: '', number: 1002 }
  ];

  const mockFeedResponse = {
    orders: mockOrders,
    total: 500,
    totalToday: 50
  };

  describe('getFeedsFromApi', () => {
    test('isLoading должно устанавливаться на true во время загрузки', () => {
      const action = { type: getFeedsFromApi.pending.type };
      const state = reducer(initialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
      expect(state.orders).toEqual([]);
      expect(state.total).toBe(0);
      expect(state.totalToday).toBe(0);
    });

    test('после завершения загрузки, isLoading должно установиться на false', () => {
      const action = {
        type: getFeedsFromApi.fulfilled.type,
        payload: mockFeedResponse
      };
      const state = reducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.orders).toBe(mockOrders);
      expect(state.total).toBe(500);
      expect(state.totalToday).toBe(50);
    });

    test('при ошибке загрузки, isLoading должно установиться на false', () => {
      const errorMessage = 'Ошибка получения заказов';
      const action = {
        type: getFeedsFromApi.rejected.type,
        payload: errorMessage
      };
      const state = reducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(errorMessage);
      expect(state.orders).toEqual([]);
      expect(state.total).toBe(0);
      expect(state.totalToday).toBe(0);
    });
  });

  describe('getOrderByNumber', () => {
    test('isLoading должно устанавливаться на true во время загрузки', () => {
      const action = { type: getOrderByNumber.pending.type };
      const state = reducer(initialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
      expect(state.modal).toBeNull();
    });

    test('после завершения загрузки, isLoading должно установиться на false', () => {
      const singleOrderResponse = { orders: [mockOrders[0]] };
      const action = {
        type: getOrderByNumber.fulfilled.type,
        payload: singleOrderResponse
      };
      const state = reducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.modal).toBe(mockOrders[0]);
    });

    test('при ошибке загрузки, isLoading должно установиться на false', () => {
      const errorMessage = 'Ошибка получения заказов';
      const action = {
        type: getOrderByNumber.rejected.type,
        payload: errorMessage
      };
      const state = reducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(errorMessage);
      expect(state.modal).toBeNull();
    });
  });
});