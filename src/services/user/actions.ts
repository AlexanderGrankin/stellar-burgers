import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  TRegisterData,
  loginUserApi,
  logoutApi,
  getUserApi,
  forgotPasswordApi,
  resetPasswordApi,
  registerUserApi,
  updateUserApi
} from '@api';
import { setUser, setIsAuthChecked } from './slice';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: Omit<TRegisterData, 'name'>) => {
    const response = await loginUserApi({ email, password });
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
  }
);

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      localStorage.clear();
      deleteCookie('accessToken');
    } catch (error) {
      return rejectWithValue('Не удалось выполнить выход');
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async (data: { email: string }, { rejectWithValue }) => {
    try {
      await forgotPasswordApi(data);
    } catch (error) {
      return rejectWithValue('Ошибка отправки сброса пароля на эл.почту');
    }
  }
);

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async (data: { password: string; token: string }, { rejectWithValue }) => {
    try {
      await resetPasswordApi(data);
    } catch (error) {
      return rejectWithValue('Не удалось сменить пароль');
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({ email, password, name }: TRegisterData, { rejectWithValue }) => {
    try {
      const data = await registerUserApi({ email, password, name });
      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data.user;
    } catch (error) {
      rejectWithValue('Не удалось зарегистрироваться');
    }
  }
);

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (_, { dispatch }) => {
    const accessToken = getCookie('accessToken');
    if (accessToken) {
      try {
        const user = await getUserApi();
        dispatch(setUser(user.user));
      } catch (error) {
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
      }
    }
    dispatch(setIsAuthChecked(true));
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ email, password, name }: TRegisterData, { rejectWithValue }) => {
    try {
      const response = await updateUserApi({ email, password, name });
      return response.user;
    } catch (error) {
      return rejectWithValue('Не удалось изменить данные');
    }
  }
);
