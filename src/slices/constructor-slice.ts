import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TConstructorState, TIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addConstructorItem: {
      reducer: (state, action: PayloadAction<any>) => {
        if (action.payload.type == 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: uuidv4() }
      })
    },
    removeConstructorItem: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id != action.payload.id
      );
    },
    resetConstructor: (state: TConstructorState) => (state = initialState),
    moveConstructorItem: (state, action) => {
      const { fromIndex, toIndex } = action.payload;
      const [movedItem] = state.ingredients.splice(fromIndex, 1);
      state.ingredients.splice(toIndex, 0, movedItem);
    }
  },
  selectors: {
    getConstructorSelector: (state: TConstructorState) => state || initialState
  }
});

export const constructorReducer = constructorSlice.reducer;
export const { getConstructorSelector } = constructorSlice.selectors;
export const {
  addConstructorItem,
  removeConstructorItem,
  resetConstructor,
  moveConstructorItem
} = constructorSlice.actions;
