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
  avgSnf: {
    type: 'number',
    required: true,
    feedback: 'avgSnf',
  },
  avgFat: {
    type: 'number',
    required: true,
    feedback: 'avgFat',
  },
  addedBy: {
    type: 'string',
    required: true, 
  }
};
