import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrderBuilderState } from '@utils-types';

const initialState: TOrderBuilderState = {
  order: null,
  name: null,
  orderRequest: false
};

export const buildOrder = createAsyncThunk(
  'order/build',
  async (ingredients: string[]) => {
    const response = await orderBurgerApi(ingredients);
    return response;
  }
);

const orderBuilderSlice = createSlice({
  name: 'builder',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(buildOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(buildOrder.rejected, (state) => {
        state = initialState;
      })
      .addCase(buildOrder.fulfilled, (state, action) => {
        state.name = action.payload.name;
        state.order = action.payload.order;
        state.orderRequest = action.payload.success;
      });
  },
  reducers: {
    resetOrder: (state) => (state = initialState)
  }
});

export const orderBuilderReducer = orderBuilderSlice.reducer;
export const { resetOrder } = orderBuilderSlice.actions;
