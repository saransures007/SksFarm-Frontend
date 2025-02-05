export const fields = {
  entryDate: {
    type: 'date',
    required: true,
    feedback: 'entryDate',
  },
  totalMilk: {
    type: 'number',
    required: true,
    feedback: 'totalMilk',
  },
  avgFat: {
    type: 'number',
    required: true,
    feedback: 'avgFat',
  },
  avgSnf: {
    type: 'number',
    required: true,
    feedback: 'avgSnf',
  },
  ratePerLiter: {
    type: 'number',
    required: true,
    feedback: 'rate/liter',
  },
  TotalAmount: {
    type: 'number',
    required: true,
    disableForForm:true,
    feedback: 'Amount',
  },
  addedBy: {
    type: 'string',
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
