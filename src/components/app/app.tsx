import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { ProtectedRoute } from '../protected-route';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams
} from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { useEffect } from 'react';
import { checkUserAuth } from '../../services/user/actions';
import { getIngredientsFromApi } from '../../services/ingredients/actions';
import { getUser } from '../../services/user/slice';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state?.background;
  const navigate = useNavigate();

  const closeModal = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(getIngredientsFromApi());
  }, [dispatch]);

  const ProfileOrderPage = () => {
    const { number } = useParams();
    return (
      <>
        <p className={`text text_type_digits-default ${styles.number}`}>
          #{number}
        </p>
        <OrderInfo />
      </>
    );
  };

  const ProfileOrderModal = () => {
    const { number } = useParams<{ number: string }>();

    return (
      <Modal title={`#${number}`} onClose={closeModal}>
        <OrderInfo />
      </Modal>
    );
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        {/* Основные роуты */}
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/:number' element={<ProfileOrderPage />} />
        <Route path='*' element={<NotFound404 />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/profile/orders/:number' element={<ProfileOrderPage />} />
        {/* Защищенные роуты */}
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
      </Routes>
      {/* Роуты модалок */}
      {background && (
        <Routes>
          <Route path='/feed/:number' element={<ProfileOrderModal />} />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={closeModal}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={<ProfileOrderModal />}
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
