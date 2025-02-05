
import { lazy } from 'react';

import { Navigate } from 'react-router-dom';

const Logout = lazy(() => import('@/pages/Logout.jsx'));
const NotFound = lazy(() => import('@/pages/NotFound.jsx'));

const Dashboard = lazy(() => import('@/pages/Dashboard'));
const MilkProduction = lazy(() => import('@/pages/MilkProduction'));
const CowMilkProduction = lazy(() => import('@/pages/CowMilkProduction'));
const CowExamination = lazy(() => import('@/pages/CowExamination'));
const CowManagement = lazy(() => import('@/pages/CowManagement'));
const  CowExpenses = lazy(() => import('@/pages/CowExpense'));
const  FarmExpenses = lazy(() => import('@/pages/FarmExpenses'));
const  FeedInventory = lazy(() => import('@/pages/FeedInventory'));
const  FeedInventoryUsage = lazy(() => import('@/pages/FeedInventoryUsage'));

const Settings = lazy(() => import('@/pages/Settings/Settings'));
const AdvancedSettings = lazy(() => import('@/pages/AdvancedSettings'));
const Profile = lazy(() => import('@/pages/Profile'));

const About = lazy(() => import('@/pages/About'));

let routes = {
  expense: [],
  default: [
    {
      path: '/login',
      element: <Navigate to="/" />,
    },
    {
      path: '/verify/*',
      element: <Navigate to="/" />,
    },
    {
      path: '/resetpassword/*',
      element: <Navigate to="/" />,
    },
    {
      path: '/logout',
      element: <Logout />,
    },
    {
      path: '/about',
      element: <About />,
    },
    {
      path: '/',
      element: <Dashboard />,
    },
    {
      path: '/milkProduction',
      element: <MilkProduction />,
    },
    {
      path: '/cowmilkProduction',
      element: <CowMilkProduction />,
    }, 
    {
      path: '/cowExamination',
      element: <CowExamination />,
    }, 
    {
      path: '/cowExpense',
      element: <CowExpenses />,
    }, 
    {
      path: '/farmExpense',
      element: <FarmExpenses />,
    },  
    {
      path: '/feedInventory',
      element: <FeedInventory />,
    }, 
    {
      path: '/feedInventoryUsage',
      element: <FeedInventoryUsage />,
    },  
     
     {
      path: '/CowManagement',
      element: <CowManagement />,
    },
    
    {
      path: '/settings',
      element: <Settings />,
    },
    {
      path: '/farmSettings',
      element: <Settings />,
    },
    {
      path: '/settings/edit/:settingsKey',
      element: <Settings />,
    },

    {
      path: '/settings/advanced',
      element: <AdvancedSettings />,
    },
    {
      path: '/profile',
      element: <Profile />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ],
};

export default routes;
