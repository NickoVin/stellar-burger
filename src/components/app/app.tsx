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

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route';
import { fetchIngredients } from '../../slices/ingredients-slice';
import { useEffect } from 'react';
import { useDispatch } from '../../services/store';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const backgroundLocation = location.state?.background;

  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);

  const onModalClose = () => {
    navigate(-1);
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='feed/' element={<Feed />} />
        <Route path='*' element={<NotFound404 />} />

        <Route path='/login' element={<ProtectedRoute />}>
          <Route path='/login' element={<Login />} />
        </Route>

        <Route path='/register' element={<ProtectedRoute />}>
          <Route path='/register' element={<Register />} />
        </Route>

        <Route path='/forgot-password' element={<ProtectedRoute />}>
          <Route path='/forgot-password' element={<ForgotPassword />} />
        </Route>

        <Route path='/reset-password' element={<ProtectedRoute />}>
          <Route path='/reset-password' element={<ResetPassword />} />
        </Route>

        <Route path='/profile' element={<ProtectedRoute />}>
          <Route path='/profile' element={<Profile />} />
        </Route>

        <Route path='/profile/orders' element={<ProtectedRoute />}>
          <Route path='/profile/orders' element={<ProfileOrders />} />
        </Route>
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title={''} onClose={onModalClose}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title={''} onClose={onModalClose}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route path='/profile/orders/:number' element={<ProtectedRoute />}>
            <Route
              path='/profile/orders/:number'
              element={
                <Modal title={''} onClose={onModalClose}>
                  <OrderInfo />
                </Modal>
              }
            />
          </Route>
        </Routes>
      )}
    </div>
  );
}

export default App;
function dispatch(arg0: any) {
  throw new Error('Function not implemented.');
}
