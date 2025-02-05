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
  date: {
    type: 'date',
    label: 'Expense Date',
    required: true,
  },
  type: {
    type: 'select',
    label: 'Expense Type',
    options: [
      { value: 'vaccine', label: 'Vaccine' },
      { value: 'pregnancy_injection', label: 'Pregnancy Injection' },
      { value: 'general_injection', label: 'General Injection' },
      { value: 'supplement', label: 'Supplement' },
      { value: 'tablets', label: 'Tablets' },
      { value: 'doctor_visit', label: 'Doctor Visit' },
      { value: 'illness_treatment', label: 'Illness Treatment' },
      { value: 'deworming', label: 'Deworming' },
      { value: 'feed_adjustment', label: 'Feed Adjustment' },
      { value: 'hoof_care', label: 'Hoof Care' },
      { value: 'other', label: 'Other' },
    ],
    required: true,
  },
  description: {
    type: 'string',
    label: 'Description',
    required: true,
  },
  cost: {
    type: 'number',
    label: 'Cost (₹)',
    required: true,
  },
  addedBy: {
    type: 'string',
    label: 'Added By',
    required: true,
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
