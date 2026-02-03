import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeedOrders, getLoading } from '../../services/feed/slice';
import { getFeedsFromApi } from '../../services/feed/actions';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const isLoading = useSelector(getLoading);

  const orders: TOrder[] = useSelector(getFeedOrders);

  useEffect(() => {
    dispatch(getFeedsFromApi());
  }, [dispatch]);

  if (!orders.length || isLoading) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getFeedsFromApi());
      }}
    />
  );
};
