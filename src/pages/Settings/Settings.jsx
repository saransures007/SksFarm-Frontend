import {
  SettingOutlined,
  FileImageOutlined,
  TrophyOutlined,
} from '@ant-design/icons';

import TabsContent from '@/components/TabsContent/TabsContent';

import CompanyLogoSettings from './CompanyLogoSettings';
import GeneralSettings from './GeneralSettings';
import CompanySettings from './CompanySettings';
import useLanguage from '@/locale/useLanguage';
import { useParams } from 'react-router-dom';

export default function Settings() {
  const translate = useLanguage();
  const { settingsKey } = useParams();
  const content = [
    {
      key: 'general_settings',
      label: translate('General Settings'),
      icon: <SettingOutlined />,
      children: <GeneralSettings />,
    },
    {
      key: 'company_settings',
      label: translate('Company Settings'),
      icon: <TrophyOutlined />,
      children: <CompanySettings />,
    },
    {
      key: 'company_logo',
      label: translate('Company Logo'),
      icon: <FileImageOutlined />,
      children: <CompanyLogoSettings />,
    },
  ];

  const pageTitle = translate('Settings');

  return <TabsContent defaultActiveKey={settingsKey} content={content} pageTitle={pageTitle} />;
}
