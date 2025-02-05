import { Link } from 'react-router-dom';
import {
  SettingOutlined,
  DashboardOutlined,
  MoneyCollectOutlined,
  TeamOutlined,
  CalendarOutlined,
  ShopOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import { GiCow, GiMilkCarton,GiFarmer } from 'react-icons/gi'; // Icons from react-icons for cow-related items

const AppNav = ({ translate }) => [
  {
    key: 'dashboard',
    icon: <DashboardOutlined />, // Dashboard icon
    label: <Link to={'/'}>{translate('dashboard')}</Link>,
  },
  {
    key: 'milkProduction',
    icon: <GiMilkCarton />, // Milk carton icon for milk production
    label: <Link to={'/milkProduction'}>{translate('Milk Production')}</Link>,
  },
  {
    key: 'cowExpense',
    icon: <MoneyCollectOutlined />, // Money icon for expenses
    label: <Link to={'/cowExpense'}>{translate('Cow Expense')}</Link>,
  },
  {
    key: 'farmExpense',
    icon: <MoneyCollectOutlined />, // Money icon for expenses
    label: <Link to={'/farmExpense'}>{translate('Farm Expense')}</Link>,
  },
  {
    key: 'feedInventory',
    icon: <MoneyCollectOutlined />, // Money icon for expenses
    label: <Link to={'/feedInventory'}>{translate('Feed Inventory')}</Link>,
  },
  {
    key: 'feedInventory Usage',
    icon: <GiHighGrass />, // Money icon for expenses
    label: <Link to={'/feedInventoryUsage'}>{translate('Feed Inventory Usage')}</Link>,
  },
  {
    key: 'cowExamination',
    icon: <BsUiChecksGrid />, // Money icon for expenses
    label: <Link to={'/cowExamination'}>{translate('Cow Examination')}</Link>,
  },
  {
    key: 'cowmilkProduction',
    icon: <GiMilkCarton />, // Reuse milk carton icon for cow milk production
    label: <Link to={'/cowmilkProduction'}>{translate('Cow Milk Production')}</Link>,
  },
  {
    key: 'CowManagement',
    icon: <GiCow />, // Cow icon for cow management
    label: <Link to={'/CowManagement'}>{translate('Cow Management')}</Link>,
  },
  {
    label: translate('Settings'),
    key: 'settings',
    icon: <SettingOutlined />, // Settings icon
    children: [
      {
        key: 'admin',
        icon: <TeamOutlined />, // Team icon for admin/staff
        label: <Link to={'/admin'}>{translate('Staff')}</Link>,
      },
      {
        key: 'generalSettings',
        icon: <ShopOutlined />, // Shop icon for general settings
        label: <Link to={'/settings'}>{translate('general_settings')}</Link>,
      },
      {
        key: 'about',
        icon: <InfoCircleOutlined />, // Info icon for about
        label: <Link to={'/about'}>{translate('about')}</Link>,
      },
    ],
  },
];

export default AppNav;
