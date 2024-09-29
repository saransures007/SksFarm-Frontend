import useLanguage from '@/locale/useLanguage';
import SetingsSection from '../components/SetingsSection';
import UpdateSettingModule from '../components/UpdateSettingModule';
import GeneralSettingForm from './forms/GeneralSettingForm';

export default function GeneralSettingsModule({ config }) {
  const translate = useLanguage();
  return (
    <UpdateSettingModule config={config}>
      <SetingsSection
        title={translate('App Settings')}
        description={translate('Update your app configuration')}
      >
        <GeneralSettingForm />
      </SetingsSection>
    </UpdateSettingModule>
  );
}
