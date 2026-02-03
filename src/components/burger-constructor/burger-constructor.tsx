import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearModalData,
  getConstructorItems,
  getOrderModalData,
  getOrderRequest,
  resetBurger
} from '../../services/constructor/slice';
import { useNavigate } from 'react-router-dom';
import { makeOrder } from '../../services/constructor/actions';
import { getIsAuthChecked, getUser } from '../../services/user/slice';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(getConstructorItems);
  const orderRequest = useSelector(getOrderRequest);
  const orderModalData = useSelector(getOrderModalData);
  const isAuthChecked = useSelector(getIsAuthChecked);
  const user = useSelector(getUser);

  const onOrderClick = () => {
    if (!user) {
      return navigate('/login');
    }

    if (!constructorItems.bun || orderRequest) return;

    const order = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id
    ].filter(Boolean);

    dispatch(makeOrder(order));
  };

  const closeOrderModal = () => {
    dispatch(resetBurger());
    dispatch(clearModalData());
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
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
