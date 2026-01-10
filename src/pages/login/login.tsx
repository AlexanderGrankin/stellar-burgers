import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch } from '../../services/store';
import { TLoginData } from '@api';
import { loginUser } from '../../services/user/actions';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const loginData: TLoginData = {
      email: email,
      password: password
    };
    try {
      await dispatch(loginUser(loginData));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
