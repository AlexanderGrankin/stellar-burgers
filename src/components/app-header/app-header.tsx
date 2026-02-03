import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { getUser } from '../../services/user/slice';

export const AppHeader: FC = () => {
  const user = useSelector(getUser);
  const userName = user?.name;

  return <AppHeaderUI userName={userName} />;
};
