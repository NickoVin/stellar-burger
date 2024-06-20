import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { buildOrder, resetOrder } from '../../slices/order-builder-slice';
import { resetConstructor } from '../../slices/constructor-slice';
import { getAuthChecked, getUser } from '../../slices/user-slice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorItems = useSelector((state) => state.burgerConstructor);
  const { order, orderRequest } = useSelector((state) => state.orderBuilder);

  const isAuthChecked = useSelector(getAuthChecked);
  const user = useSelector(getUser);

  const onOrderClick = () => {
    if (!isAuthChecked || !user) {
      navigate('/login');
      return;
    }

    if (
      !constructorItems.bun ||
      constructorItems.ingredients.length < 0 ||
      orderRequest
    )
      return;

    const ingredients = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((unit) => unit._id),
      constructorItems.bun._id
    ];

    dispatch(buildOrder(ingredients));
  };

  const closeOrderModal = () => {
    dispatch(resetOrder());
    dispatch(resetConstructor());
    navigate('/');
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={order}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
