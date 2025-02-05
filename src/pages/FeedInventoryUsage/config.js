export const feedInventoryUsageFields = {
  date: {
    type: 'date',
    label: 'Date',
    required: true,
  },
  feedType: {
    type: 'select',
    label: 'Feed Type',
    options: [
      { value: 'Silage', label: 'Silage' },
      { value: 'TMR Feed', label: 'TMR Feed' },
      { value: 'Pellet Feed', label: 'Pellet Feed' },
    ],
    required: true,
  },
  quantityUsed: {
    type: 'number',
    label: 'Quantity Used (Kg)',
    required: true,
    placeholder: 'Enter quantity used in Kg',
    tooltip: 'Enter the amount of feed used in kg.',
  },
  remainingQuantity: {
    type: 'number',
    label: 'Remaining Quantity (Kg)',
    disableForForm: true,
    tooltip: 'This will be automatically calculated based on inventory and usage.',
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
