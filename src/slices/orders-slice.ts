import { createSlice } from '@reduxjs/toolkit';
import { TOrderState } from '@utils-types';
import { fetchOrders } from '../actions/orders-actions';

const initialState: TOrderState = {
  orders: []
};

const orders = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
  }
});

export const ordersReducer = orders.reducer;
