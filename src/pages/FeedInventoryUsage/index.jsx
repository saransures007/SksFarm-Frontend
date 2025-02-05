import CrudModule from '@/modules/CrudModule/CrudModule';
import DynamicForm from '@/forms/DynamicForm';
import { feedInventoryUsageFields as baseFields } from './config'; // Import base fields configuration
import useLanguage from '@/locale/useLanguage';
import dayjs from 'dayjs';

export default function FeedInventoryUsage() {
  const translate = useLanguage();
  const entity = 'feedInventoryUsage';

  // Get userId from localStorage (or your preferred auth method)
  const userId = localStorage.getItem('auth')
    ? JSON.parse(localStorage.getItem('auth')).current._id
    : null;

  console.log('local', JSON.parse(localStorage.getItem('auth')));
  console.log('userId', userId);

  const fields = {
    ...baseFields,
    addedBy: {
      defaultValue: userId, // Assign the userId to the usedBy field
      type: 'hidden', // Optionally hide this field
    },
    date: {
      ...baseFields.date,
      initialValue: dayjs(), // Set the initial value to the current date
    },
  };

  console.log('fields', fields);

  const searchConfig = {
    displayLabels: ['feedType', 'quantityUsed', 'remainingQuantity', 'usedBy'], // Fields to display in search
    searchFields: 'feedType,quantityUsed,remainingQuantity,usedBy', // Fields searchable in the module
  };

  const deleteModalLabels = ['feedType', 'quantityUsed'];

  const Labels = {
    PANEL_TITLE: translate('feed_inventory_usage'),
    DATATABLE_TITLE: translate('feed_inventory_usage_list'),
    ADD_NEW_ENTITY: translate('add_new_feed_inventory_usage'),
    ENTITY_NAME: translate('feed_inventory_usage'),
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
