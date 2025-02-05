import CrudModule from '@/modules/CrudModule/CrudModule';
import DynamicForm from '@/forms/DynamicForm';
import { cowExaminationFields as baseFields } from './config'; // Import base fields configuration
import useLanguage from '@/locale/useLanguage';
import dayjs from 'dayjs';

export default function CowExamination() {
  const translate = useLanguage();
  const entity = 'cowExamination';

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
    entryDate: {
      ...baseFields.entryDate,
      initialValue: dayjs(), // Set the initial value to the current date
    },
    nextCheckupDate: {
      ...baseFields.nextCheckupDate,
      initialValue: dayjs().add(30, 'days'), // Default to 30 days from today
    },
  };

  console.log("fields", fields);

  const searchConfig = {
    displayLabels: ['id', 'cowId', 'disease', 'treatment'], // Fields to display in search
    searchFields: 'id,cowId,disease,treatment', // Fields searchable in the module
  };

  const deleteModalLabels = ['date', 'disease', 'treatment'];

  const Labels = {
    PANEL_TITLE: translate('cow_examinations'),
    DATATABLE_TITLE: translate('cow_examinations_list'),
    ADD_NEW_ENTITY: translate('add_new_cow_examination'),
    ENTITY_NAME: translate('cow_examination'),
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
