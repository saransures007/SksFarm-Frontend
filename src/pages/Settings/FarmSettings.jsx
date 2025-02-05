import useLanguage from '@/locale/useLanguage';
import FarmSettingsModule from '@/modules/SettingModule/FarmSettingsModule';


export default function FarmSettings() {
  const translate = useLanguage();

  const entity = 'setting';

  const Labels = {
    PANEL_TITLE: translate('settings'),
    DATATABLE_TITLE: translate('settings_list'),
    ADD_NEW_ENTITY: translate('add_new_settings'),
    ENTITY_NAME: translate('settings'),

    SETTINGS_TITLE: translate('Farm Settings'),
  };

  const configPage = {
    entity,
    settingsCategory: 'farm_settings',
    ...Labels,
  };
  return <FarmSettingsModule config={configPage} />;
}
