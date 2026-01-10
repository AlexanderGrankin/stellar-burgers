import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { getLoading } from '../../services/user/slice';
import { Preloader } from '@ui';
import { TRegisterData } from '@api';
import { registerUser } from '../../services/user/actions';
import { useNavigate } from 'react-router-dom';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const isLoading = useSelector(getLoading);
  const navigate = useNavigate();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const registerData: TRegisterData = {
      name: userName,
      email: email,
      password: password
    };
    try {
      await dispatch(registerUser(registerData));
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
