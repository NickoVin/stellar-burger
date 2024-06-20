import {
  TLoginData,
  TRegisterData,
  loginUserApi,
  registerUserApi,
  TAuthResponse,
  logoutApi,
  getUserApi,
  updateUserApi
} from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteCookie, setCookie } from '../utils/cookie';
import { setAuthChecked, setUser } from '../slices/user-slice';
import { AppDispatch } from '../services/store';

export const register = createAsyncThunk(
  'user/register',
  async ({ email, name, password }: TRegisterData) => {
    const authResponse = await registerUserApi({ email, name, password });
    trySetTokens(authResponse);
    return authResponse;
  }
);

export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }: TLoginData) => {
    const authResponse = await loginUserApi({ email, password });
    trySetTokens(authResponse);
    return authResponse;
  }
);

export const logout = createAsyncThunk('user/logout', async () => {
  const success = await logoutApi();

  if (!success) return;

  deleteCookie('accessToken');
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
});

export const checkAuth = createAsyncThunk<
  void,
  void,
  { dispatch: AppDispatch }
>('user/checkAuth', async (_, { dispatch }) => {
  dispatch(setAuthChecked(true));

  if (!localStorage.getItem('accessToken')) return;

  getUserApi()
    .then((res) => {
      dispatch(setUser(res.user));
    })
    .finally(() => {
      dispatch(setAuthChecked(true));
    });
});

export const update = createAsyncThunk(
  'user/update',
  async ({ email, name, password }: TRegisterData) =>
    updateUserApi({ email, name, password })
);

const trySetTokens = (authResponse: TAuthResponse): boolean => {
  const { success, accessToken, refreshToken } = authResponse;

  if (!success) return false;

  setCookie('accessToken', accessToken);
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);

  return true;
};
