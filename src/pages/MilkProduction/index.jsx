import CrudModule from '@/modules/CrudModule/CrudModule';
import DynamicForm from '@/forms/DynamicForm';
import { fields  as baseFields} from './config';
import useLanguage from '@/locale/useLanguage';
import dayjs from 'dayjs';

export default function TotalMilkProduction() {
  const translate = useLanguage();
  const entity = 'totalMilkProduction';

   // Get userId from localStorage (or your preferred auth method)
  const userId = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')).current._id : null;
  console.log("local", JSON.parse(localStorage.getItem('auth')))
  console.log("userId",userId)
  
  // Clone and modify fields to set userId as default value for "addedBy"
  const fields = {
    ...baseFields,
    entryDate: {
      ...baseFields.entryDate,
      initialValue: dayjs(), // Set the initial value to the current date
    },
    addedBy: {
      ...baseFields.addedBy,
      defaultValue: userId, // Assign the userId to the addedBy field
      type: 'hidden', // Optionally hide this field
    },
  };

  console.log("fields", fields)
  
  const searchConfig = {
    displayLabels: ['entryDate', 'totalMilk'],
    searchFields: 'entryDate,totalMilk',
  };
  
  const deleteModalLabels = ['entryDate'];

  const Labels = {
    PANEL_TITLE: translate('total_milk_production'),
    DATATABLE_TITLE: translate('total_milk_production_list'),
    ADD_NEW_ENTITY: translate('add_new_total_milk_production'),
    ENTITY_NAME: translate('total_milk_production'),
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
