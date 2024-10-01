import { selectColor } from '@/utils/color';

export const fields = {
  id: { 
    type: 'string', 
    label: 'ID', 
    required: true 
  },
  earTagNumber: { 
    type: 'string', 
    label: 'Ear Tag Number', 
    required: true, 
    unique: true, 
  },
  rfidKey: { 
    type: 'string', 
    label: 'RFID Key', 
    required: true, 
    unique: true, 
  },
  name: { 
    type: 'string', 
    label: 'Name', 
  },
  breed: {
    type: 'selectWithFeedback',
    label: 'Breed',
    options: [
      { value: 'Sindhu', label: 'Sindhu', color: selectColor.green },
      { value: 'Jersey', label: 'Jersey', color: selectColor.blue },
      { value: 'Shaiwal', label: 'Shaiwal', color: selectColor.orange },
      { value: 'Gir', label: 'Gir', color: selectColor.purple },
      { value: 'Cross Breed', label: 'Cross Breed', color: selectColor.magenta },
    ],
    renderAsTag: true,
    required: true,
    hasFeedback: true,
  },
  entryDate: { 
    type: 'date', 
    label: 'Entry Date', 
    required: true 
  },
  purchasedAmount: { 
    type: 'number', 
    label: 'Purchased Amount', 
    required: true, 
  },
  origin: { 
    type: 'selectWithTranslation',
    label: 'Origin',
    options: [
      { value: 'Local Farm', label: 'Local Farm', color: selectColor.lightgreen },
      { value: 'Imported Farm', label: 'Imported Farm', color: selectColor.darkgreen },
    ],
    renderAsTag: true,
  },
  motherId: {
    type: 'searchID', // Change to search type
    label: 'MotherID',
    entity: 'cow', // Assuming 'cows' is the entity where cows data is stored
    displayLabels: ['id', 'earTagNumber'], // Fields to display in the search dropdown
    searchFields: 'id,earTagNumber', // Fields to search
    dataIndex: ['cows', 'id'], // Index to use for search
    disableForTable: true,
    feedback: 'motherI',
  },
  expectedLiter: { 
    type: 'number', 
    label: 'Expected Liter', 
    required: true, 
    min: 1, 
    max: 60 
  },
  addedBy: { 
    type: 'string', 
    label: 'Added By', 
    required: true 
  },
  birthDate: { 
    type: 'date', 
    label: 'Birth Date', 
    required: true 
  },
  gender: {
    type: 'selectWithFeedback',
    label: 'Gender',
    options: [
      { value: 'Cow', label: 'Cow', color: selectColor.orange },
      { value: 'Bull', label: 'Bull', color: selectColor.red },
    ],
    renderAsTag: true,
    required: true,
    hasFeedback: true,
  },
  isMilking: {
    type: 'boolean', // Use toggle for isMilking
    label: 'Is Milking',
    required: false,
  },
  breedingStartDate: {
    type: 'date',
    label: 'Breeding Start Date',
    required: false,
  },
  breedingEndDate: {
    type: 'date',
    label: 'Breeding End Date',
    required: false,
  },
  soldDate: { 
    type: 'date', 
    label: 'Sold Date', 
    required: false 
  },
  soldAmount: { 
    type: 'number', 
    label: 'Sold Amount', 
  },
  
};
