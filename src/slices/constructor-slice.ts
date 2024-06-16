import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TConstructorState } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addConstructorItem: (state, action) => {
      if (action.payload.type == 'bun') {
        state.bun = { ...action.payload, id: uuidv4() };
      } else {
        state.ingredients.push({ ...action.payload, id: uuidv4() });
      }
    },
    removeConstructorItem: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id != action.payload.id
      );
    },
    resetConstructor: (state: TConstructorState) => (state = initialState)
  },
  selectors: {
    getConstructorSelector: (state: TConstructorState) => state || initialState
  }
});

export const constructorReducer = constructorSlice.reducer;
export const { getConstructorSelector } = constructorSlice.selectors;
export const { addConstructorItem, removeConstructorItem, resetConstructor } =
  constructorSlice.actions;
