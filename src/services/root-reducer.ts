import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsReducer } from '../slices/ingredients-slice';
import { constructorReducer } from '../slices/constructor-slice';
import { orderBuilderReducer } from '../slices/order-builder-slice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  orderBuilder: orderBuilderReducer
});
