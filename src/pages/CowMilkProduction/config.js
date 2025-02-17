
export const fields = {
  cowId: {
    type: 'searchID',
    label: 'Cow ID',
    entity: 'cow',
    displayLabels: ['id', 'earTagNumber', 'rfidKey', 'name'],
    searchFields: 'id,earTagNumber,rfidKey,name',
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
    // required: true,
  },
  fat: {
    type: 'number',
    label: 'Fat',
    // required: true,
  },
  silage: { // New field for silage
    type: 'number', // Quantity of silage in kg (or appropriate unit)
    label: 'Silage',
    initialValue: 12,
  },
  tmrFeed: { // New field for silage
    type: 'number', // Quantity of silage in kg (or appropriate unit)
    label: 'TMR Feed',
    initialValue: 8,

  },
  dryFodder: { // New field for silage
    type: 'number', // Quantity of silage in kg (or appropriate unit)
    label: 'Dry Fodder',
    initialValue: 7,

  },
  pelletsFeed: { // New field for silage
    type: 'number', // Quantity of silage in kg (or appropriate unit)
    label: 'Pellets Feed',
    initialValue: 0,

  },
  addedBy: {
    type: 'string',
    label: 'Added By',

  },
  lastUpdated: {
    type: 'date',
    label: 'Last Updated',
    disableForForm: true, // Automatically set
  },
  createdAt: {
    type: 'date',
    label: 'Created At',
    disableForForm: true, // Automatically set
  },
};
