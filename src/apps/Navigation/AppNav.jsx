import { Link } from 'react-router-dom';

import {
  SettingOutlined,
  DashboardOutlined,
  CloudDownloadOutlined,
} from '@ant-design/icons';

const AppNav = ({ translate }) => [
  {
    key: 'dashboard',
    icon: <DashboardOutlined />,
    label: <Link to={'/'}>{translate('dashboard')}</Link>,
  },
  {
    key: 'milkProduction',
    icon: <CloudDownloadOutlined />,
    label: <Link to={'/milkProduction'}>{translate('Milk Producion')}</Link>,
  },
  {
    key: 'cowmilkProduction',
    icon: <CloudDownloadOutlined />,
    label: <Link to={'/cowmilkProduction'}>{translate('Cow Milk Producion')}</Link>,
  },
  {
    key: 'CowManagement',
    icon: <GiCow />,
    label: <Link to={'/CowManagement'}>{translate('Cow Management')}</Link>,
  },

  {
    label: translate('Settings'),
    key: 'settings',
    icon: <SettingOutlined />,
    children: [
      {
        key: 'admin',
        // icon: <TeamOutlined />,
        label: <Link to={'/admin'}>{translate('Staff')}</Link>,
      },
      {
        key: 'generalSettings',
        label: <Link to={'/settings'}>{translate('general_settings')}</Link>,
      },
      {
        key: 'about',
        label: <Link to={'/about'}>{translate('about')}</Link>,
      },
    ],
  },
];

export default AppNav;
