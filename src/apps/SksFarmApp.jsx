import { lazy, Suspense, useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { selectAuth } from '@/redux/auth/selectors';
import { AppContextProvider } from '@/context/appContext';
import PageLoader from '@/components/PageLoader';
import AuthRouter from '@/router/AuthRouter';
import Localization from '@/locale/Localization';
import { notification } from 'antd';

const FarmApp = lazy(() => import('./FarmApp'));

const DefaultApp = () => (
  <Localization>
    <AppContextProvider>
      <Suspense fallback={<PageLoader />}>
        <FarmApp />
      </Suspense>
    </AppContextProvider>
  </Localization>
);

export default function SksFarmOs() {
  const { isLoggedIn } = useSelector(selectAuth);

  console.log(
    '🚀 Welcome to SksFarm'
  );

  if (!isLoggedIn)
    return (
      <Localization>
        <AuthRouter />
      </Localization>
    );
  else {
    return <DefaultApp />;
  }
}
