import { userSlice, initialState } from './slice';
import {
  loginUser,
  logoutUser,
  registerUser
} from './actions';
import { TUser } from '@utils-types';

const { reducer } = userSlice;

describe('userSlice reducer', () => {
  const mockUser: TUser = {
    email: 'test@example.com',
    name: 'Test User'
  };

  describe('loginUser', () => {
    test('isLoading должно устанавливаться на true во время загрузки', () => {
      const action = { type: loginUser.pending.type };
      const state = reducer(initialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
      expect(state.isAuthChecked).toBe(false);
    });

    test('после завершения загрузки, isLoading должно установиться на false', () => {
      const action = {
        type: loginUser.fulfilled.type,
        payload: mockUser
      };
      const state = reducer(initialState, action);

      expect(state.user).toEqual(mockUser);
      expect(state.isAuthChecked).toBe(true);
      expect(state.isLoading).toBe(false);
    });

    test('при ошибке загрузки, isLoading должно установиться на false', () => {
      const errorMessage = 'Неверный логин или пароль';
      const action = {
        type: loginUser.rejected.type,
        payload: errorMessage
      };
      const state = reducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(errorMessage);
      expect(state.isAuthChecked).toBe(true);
    });
  });

  describe('logoutUser', () => {
    test('isLoading должно устанавливаться на true во время загрузки', () => {
      const action = { type: logoutUser.pending.type };
      const state = reducer(initialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.isAuthChecked).toBe(true);
    });

    test('после завершения загрузки, isLoading должно установиться на false', () => {
      const prevState = {
        ...initialState,
        user: mockUser,
        isAuthChecked: true
      };
      const action = { type: logoutUser.fulfilled.type };
      const state = reducer(prevState, action);

      expect(state.user).toBeNull();
      expect(state.isAuthChecked).toBe(false);
      expect(state.isLoading).toBe(false);
    });
  });

  describe('registerUser', () => {
    test('isLoading должно устанавливаться на true во время загрузки', () => {
      const action = { type: registerUser.pending.type };
      const state = reducer(initialState, action);

      expect(state.isLoading).toBe(true);
    });

    test('после завершения загрузки, isLoading должно установиться на false', () => {
      const action = { type: registerUser.fulfilled.type };
      const state = reducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.isAuthChecked).toBe(true);
      expect(state.user).toBeNull(); 
    });

    test('при ошибке загрузки, isLoading должно установиться на false', () => {
      const errorMessage = 'Пользователь с таким email уже существует';
      const action = {
        type: registerUser.rejected.type,
        payload: errorMessage
      };
      const state = reducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });
});