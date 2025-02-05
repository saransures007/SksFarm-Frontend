import CrudModule from '@/modules/CrudModule/CrudModule';
import DynamicForm from '@/forms/DynamicForm';
import { fields as baseFields } from './config'; // Import base fields configuration
import useLanguage from '@/locale/useLanguage';
import dayjs from 'dayjs';

export default function CowExpenses() {
  const translate = useLanguage();
  const entity = 'cowExpense';

  // Get userId from localStorage (or your preferred auth method)
  const userId = localStorage.getItem('auth')
    ? JSON.parse(localStorage.getItem('auth')).current._id
    : null;

  console.log("local", JSON.parse(localStorage.getItem('auth')));
  console.log("userId", userId);

  const fields = {
    ...baseFields,
    addedBy: {
      defaultValue: userId, // Assign the userId to the addedBy field
      type: 'hidden', // Optionally hide this field
    },
    date: {
      ...baseFields.date,
      initialValue: dayjs(), // Set the initial value to the current date
    },
  };

  console.log("fields", fields);


  const searchConfig = {
    displayLabels: ['id', 'earTagNumber', 'rfidKey'], // Include silage in search display
    searchFields: 'id,earTagNumber,rfidKey', // Make silage searchable
  };

  const deleteModalLabels = ['date', 'type', 'description'];

  const Labels = {
    PANEL_TITLE: translate('cow_expenses'),
    DATATABLE_TITLE: translate('cow_expenses_list'),
    ADD_NEW_ENTITY: translate('add_new_cow_expense'),
    ENTITY_NAME: translate('cow_expense'),
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
