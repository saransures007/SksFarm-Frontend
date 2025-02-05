export const farmExpenseFields = {
  date: {
    type: 'date',
    label: 'Expense Date',
    required: true,
  },
  type: {
    type: 'select',
    label: 'Expense Type',
    options: [
      { value: 'Worker Salary', label: 'Worker Salary' },
      { value: 'Construction', label: 'Construction' },
      { value: 'Machinery', label: 'Machinery' },
      { value: 'Investment', label: 'Investment' },
      { value: 'Supplement', label: 'Supplement' },
      { value: 'Additional Feed', label: 'Additional Feed' },
      { value: 'Other', label: 'Other' },
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
