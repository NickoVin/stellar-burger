import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredientsState } from '@utils-types';
import { fetchIngredients } from '../actions/ingredients-actions';

const initialState: TIngredientsState = {
  ingredients: [],
  loading: false,
  error: null
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch ingridients';
      });
  },
  selectors: {
    getIngredients: (state) => state.ingredients
  }
});

export const ingredientsReducer = ingredientsSlice.reducer;
export const { getIngredients } = ingredientsSlice.selectors;
