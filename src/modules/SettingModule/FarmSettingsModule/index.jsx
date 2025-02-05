import useLanguage from '@/locale/useLanguage';
import SetingsSection from '../components/SetingsSection';
import UpdateSettingModule from '../components/UpdateSettingModule';
import FarmSettings from './forms/FarmSettings';

export default function FarmSettingsModule({ config }) {
  const translate = useLanguage();
  return (
    <UpdateSettingModule config={config}>
      <SetingsSection
        title={translate('Farm Settings')}
        description={translate('Update your Farm configuration')}
      >
        <FarmSettings/>
      </SetingsSection>
    </UpdateSettingModule>
  );
}
