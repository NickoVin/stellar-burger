import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TUser, TUsersState } from '@utils-types';
import {
  checkAuth,
  login,
  logout,
  register,
  update
} from '../actions/user-actions';

const initialState: TUsersState = {
  isAuthChecked: false,
  user: null,
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  selectors: {
    getUser: (state) => state.user,
    getAuthChecked: (state) => state.isAuthChecked,
    getError: (state) => state.error
  },
  reducers: {
    setAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    setUser: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.rejected, (state, action) => {
        state.user = null;
        state.error = action.error.message ?? null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.user = null;
        state.error = action.error.message ?? null;
        state.isAuthChecked = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(update.pending, (state) => {
        state.error = '';
      })
      .addCase(update.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.error = action.error.message!;
      })
      .addCase(update.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
      })
      .addCase(checkAuth.rejected, () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      });
  }
});

export const userReducer = userSlice.reducer;
export const { setAuthChecked, setUser } = userSlice.actions;
export const { getUser, getAuthChecked, getError } = userSlice.selectors;
