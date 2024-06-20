import { createSlice } from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';
import { fetchFeeds } from '../actions/feeds-actions';

const initialState: TOrdersData = {
  orders: [],
  total: 0,
  totalToday: 0
};

export const feeds = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFeeds.fulfilled, (state, action) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    });
  }
});

export const feedsReducer = feeds.reducer;
