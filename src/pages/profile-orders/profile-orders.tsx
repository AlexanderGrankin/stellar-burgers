import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getLoading, getOrders } from '../../services/orders/slice';
import { getOrdersFromApi } from '../../services/orders/actions';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(getOrders);
  const isOrdersLoading = useSelector(getLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrdersFromApi());
  }, [dispatch]);

  if (isOrdersLoading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
