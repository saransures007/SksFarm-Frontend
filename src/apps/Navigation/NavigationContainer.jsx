import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Drawer, Layout, Menu } from 'antd';
import { GiCow, GiMilkCarton } from "react-icons/gi";
import { BsUiChecksGrid } from "react-icons/bs";
import {
  SettingOutlined,
  DashboardOutlined,
  MoneyCollectOutlined,
  MenuOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import { LuMilk } from "react-icons/lu";
import { GiHighGrass,GiFarmer } from "react-icons/gi";
import { PiCowBold } from "react-icons/pi";
import { PiFarmFill } from "react-icons/pi";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";

import { useAppContext } from '@/context/appContext';
import useLanguage from '@/locale/useLanguage';
// import logoIcon from '@/style/images/logo-icon.svg';
import logoIcon from '@/style/images/SKNlogo.png';

// import logoText from '@/style/images/logo-text.svg';
import useResponsive from '@/hooks/useResponsive';
import { useSelector } from 'react-redux';
import { selectLangDirection } from '@/redux/translate/selectors';

const { Sider } = Layout;

export default function Navigation() {
  const { isMobile } = useResponsive();

  return isMobile ? <MobileSidebar /> : <Sidebar collapsible={false} />;
}

function Sidebar({ collapsible, isMobile = false }) {
  let location = useLocation();

  const { state: stateApp, appContextAction } = useAppContext();
  const { isNavMenuClose } = stateApp;
  const { navMenu } = appContextAction;
  const [showLogoApp, setLogoApp] = useState(isNavMenuClose);
  const [currentPath, setCurrentPath] = useState(location.pathname.slice(1));

  const translate = useLanguage();
  const navigate = useNavigate();

  const items = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />, // Dashboard icon
      label: <Link to={'/'}>{translate('dashboard')}</Link>,
    },
    {
      key: 'milkProduction',
      icon: <LuMilk />, // Milk carton icon for milk production
      label: <Link to={'/milkProduction'}>{translate('Milk Production')}</Link>,
    },
    {
      key: 'cowExpense',
      icon: <PiCowBold />, // Money icon for expenses
      label: <Link to={'/cowExpense'}>{translate('Cow Expense')}</Link>,
    },
    {
      key: 'farmExpense',
      icon: <PiFarmFill />, // Money icon for expenses
      label: <Link to={'/farmExpense'}>{translate('Farm Expense')}</Link>,
    },
    {
      key: 'feedInventory',
      icon: <GiHighGrass />, // Money icon for expenses
      label: <Link to={'/feedInventory'}>{translate('Feed Inventory')}</Link>,
    },
    {
      key: 'feedInventory Usage',
      icon: <GiFarmer />, // Money icon for expenses
      label: <Link to={'/feedInventoryUsage'}>{translate('Feed Inventory Usage')}</Link>,
    },
    {
      key: 'cowExamination',
      icon: <BsUiChecksGrid />, // Money icon for expenses
      label: <Link to={'/cowExamination'}>{translate('Cow Examination')}</Link>,
    },
    {
      key: 'cowmilkProduction',
      icon: <GiMilkCarton />, // Milk carton icon for cow milk production
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
          key: 'generalSettings',
          icon: <SettingOutlined />, // Same as parent settings
          label: <Link to={'/settings'}>{translate('General Settings')}</Link>,
        },
        {
          key: 'about',
          icon: <InfoCircleOutlined />, // Info icon for about
          label: <Link to={'/about'}>{translate('About')}</Link>,
        },
      ],
    },
  ];

  useEffect(() => {
    if (location)
      if (currentPath !== location.pathname) {
        if (location.pathname === '/') {
          setCurrentPath('dashboard');
        } else setCurrentPath(location.pathname.slice(1));
      }
  }, [location, currentPath]);

  useEffect(() => {
    if (isNavMenuClose) {
      setLogoApp(isNavMenuClose);
    }
    const timer = setTimeout(() => {
      if (!isNavMenuClose) {
        setLogoApp(isNavMenuClose);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [isNavMenuClose]);
  const onCollapse = () => {
    navMenu.collapse();
  };

  const langDirection = useSelector(selectLangDirection);
  return (
    <Sider
      collapsible={collapsible}
      collapsed={collapsible ? isNavMenuClose : collapsible}
      onCollapse={onCollapse}
      className="navigation"
      width={256}
      style={{
        overflow: 'auto',
        height: '100vh',
        direction: langDirection,
        position: isMobile ? 'absolute' : 'relative',
        bottom: '20px',
        ...(!isMobile && {
          background: 'none',
          border: 'none',
          [langDirection === 'rtl' ? 'right' : 'left']: '20px',
          top: '20px',
          borderRadius: '8px',
        }),
      }}
      theme={'light'}
    >
      <div
        className="logo"
        onClick={() => navigate('/')}
        style={{
          cursor: 'pointer',
        }}
      >
        <img src={logoIcon} alt="Logo" style={{ marginLeft: '-5px', height: '80px' }} />
      </div>
      <Menu
        items={items}
        mode="inline"
        theme={'light'}
        selectedKeys={[currentPath]}
        style={{
          background: 'none',
          border: 'none',
          width: 256,
        }}
      />
    </Sider>
  );
}

function MobileSidebar() {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const langDirection = useSelector(selectLangDirection);
  return (
    <>
      <Button
        type="text"
        size="large"
        onClick={showDrawer}
        className="mobile-sidebar-btn"
        style={{ [langDirection === 'rtl' ? 'marginRight' : 'marginLeft']: 25 }}
      >
        <MenuOutlined style={{ fontSize: 18 }} />
      </Button>
      <Drawer
        width={250}
        contentWrapperStyle={{
          boxShadow: 'none',
        }}
        style={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}
        placement={langDirection === 'rtl' ? 'right' : 'left'}
        closable={false}
        onClose={onClose}
        open={visible}
      >
        <Sidebar collapsible={false} isMobile={true} />
      </Drawer>
    </>
  );
}
