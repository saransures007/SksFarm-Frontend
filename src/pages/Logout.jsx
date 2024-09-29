import { useEffect, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout as logoutAction } from '@/redux/auth/actions';
import { crud } from '@/redux/crud/actions';
import { sks } from '@/redux/farm/actions';
import PageLoader from '@/components/PageLoader';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function asyncLogout() {
    dispatch(logoutAction());
  }

  useLayoutEffect(() => {
    dispatch(crud.resetState());
    dispatch(sks.resetState());
  }, []);

  useEffect(() => {
    asyncLogout();
    navigate('/login');
  }, []);

  return <PageLoader />;
};
export default Logout;
