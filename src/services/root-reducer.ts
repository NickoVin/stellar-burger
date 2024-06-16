import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsReducer } from '../slices/ingredients-slice';
import { constructorReducer } from '../slices/constructor-slice';
import { orderBuilderReducer } from '../slices/order-builder-slice';
import { userReducer } from '../slices/user-slice';
import { feedsReducer } from '../slices/feeds-slice';
import { ordersReducer } from '../slices/orders-slice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  orderBuilder: orderBuilderReducer,
  user: userReducer,
  feeds: feedsReducer,
  orders: ordersReducer
});
