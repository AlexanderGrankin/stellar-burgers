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
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { checkUserAuth } from '../../services/user/actions';
import { getIngredientsFromApi } from '../../services/ingredients/actions';

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

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        {/* Основные роуты */}
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='*' element={<NotFound404 />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/profile/orders/:number' element={<OrderInfo />} />
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
          <Route
            path='/feed/:number'
            element={
              <Modal title='' onClose={closeModal}>
                <OrderInfo />
              </Modal>
            }
          />
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
            element={
              <Modal title='' onClose={closeModal}>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
