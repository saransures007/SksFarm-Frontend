import CrudModule from '@/modules/CrudModule/CrudModule';
import DynamicForm from '@/forms/DynamicForm';
import { feedInventoryFields as baseFields } from './config'; // Import base fields configuration
import useLanguage from '@/locale/useLanguage';
import dayjs from 'dayjs';

export default function FeedInventory() {
  const translate = useLanguage();
  const entity = 'feedInventory';

  // Get userId from localStorage (or your preferred auth method)
  const userId = localStorage.getItem('auth')
    ? JSON.parse(localStorage.getItem('auth')).current._id
    : null;

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



  const searchConfig = {
    displayLabels: ['feedType', 'quantity', 'unit', 'totalCost', 'addedBy'], // Fields to display in search
    searchFields: 'feedType,quantity,unit,totalCost,addedBy', // Fields searchable in the module
  };

  const deleteModalLabels = ['feedType', 'quantity', 'unit'];

  const Labels = {
    PANEL_TITLE: translate('feed_inventory'),
    DATATABLE_TITLE: translate('feed_inventory_list'),
    ADD_NEW_ENTITY: translate('add_new_feed_inventory'),
    ENTITY_NAME: translate('feed_inventory'),
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
