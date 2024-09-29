import CrudModule from '@/modules/CrudModule/CrudModule';
import DynamicForm from '@/forms/DynamicForm';
import { fields as baseFields} from './config'; // fields for cow

import useLanguage from '@/locale/useLanguage';

export default function Cow() {
  const translate = useLanguage();
  const entity = 'cow';

  // Get userId from localStorage (or your preferred auth method)
  const userId = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')).current._id : null;
  console.log("local", JSON.parse(localStorage.getItem('auth')))
  console.log("userId",userId)
  
  // Clone and modify fields to set userId as default value for "addedBy"
  const fields = {
    ...baseFields,
    addedBy: {
      ...baseFields.addedBy,
      defaultValue: userId, // Assign the userId to the addedBy field
      type: 'hidden', // Optionally hide this field
    },
  };
  
  const searchConfig = {
    displayLabels: ['earTagNumber', 'rfidKey'],
    searchFields: 'earTagNumber',
  };
  const deleteModalLabels = ['earTagNumber'];

  const Labels = {
    PANEL_TITLE: translate('cow'),
    DATATABLE_TITLE: translate('cow_list'),
    ADD_NEW_ENTITY: translate('add_new_cow'),
    ENTITY_NAME: translate('cow'),
  };

  const configPage = {
    entity,
    ...Labels,
  };

  const config = {
    ...configPage,
    fields,
    searchConfig,
    deleteModalLabels,
  };

  return (
    <CrudModule
      createForm={<DynamicForm fields={fields} />}
      updateForm={<DynamicForm fields={fields} />}
      config={config}
    />
  );
}
