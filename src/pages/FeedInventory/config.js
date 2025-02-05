export const feedInventoryFields = {
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
  quantity: {
    type: 'number',
    label: 'Quantity in Kg',
    required: true,
    placeholder: 'Enter quantity in Kg',
    tooltip: 'Provide the quantity of the feed in kg',
  },
  cost: {
    type: 'number',
    label: 'Total Cost (₹)',
    required: true,
    placeholder: 'Enter total Cost' ,
    tooltip: 'Enter the cost for the feed.',
  },
  costPerUnit: {
    type: 'number',
    label: 'Cost Per Kg (₹)',
    required: true,
    disableForForm:true,
    placeholder: 'Enter the cost per unit (e.g., cost per kg)',
    tooltip: 'This will be calculated automatically based on quantity and cost per unit.',
  },
  addedBy: {
    type: 'string',
    label: 'Added By',
    required: true,
    placeholder: 'Enter the name of the user adding this record',
    tooltip: 'Name of the person who updated this record.',
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
