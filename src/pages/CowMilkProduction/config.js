
export const fields = {
  cowId: {
    type: 'searchID',
    label: 'Cow ID',
    entity: 'cow',
    displayLabels: ['id', 'earTagNumber', 'rfidKey'],
    searchFields: 'id,earTagNumber,rfidKey',
    dataIndex: ['cows', 'id'],
    required: true,
    feedback: 'cowId',
    disableForTable: true,
  },
  id: { 
    type: 'string', 
    label: 'ID', 
    disableForForm: true,
  },
  earTagNumber: { 
    type: 'string', 
    label: 'Ear Tag Number', 
    disableForForm: true,
  },
  rfidKey: { 
    type: 'string', 
    label: 'RFID Key', 
    disableForForm: true,
  },
  liter: {
    type: 'number',
    label: 'Liter',
    required: true,
  },
  entryDate: {
    type: 'date',
    label: 'Entry Date',
    required: true,
  },
  snf: {
    type: 'number',
    label: 'SNF',
    required: true,
  },
  fat: {
    type: 'number',
    label: 'Fat',
    required: true,
  },
  silage: { // New field for silage
    type: 'number', // Quantity of silage in kg (or appropriate unit)
    label: 'Silage',
    required: true,
  },
  addedBy: {
    type: 'string',
    label: 'Added By',
    required: true,
  }
};
