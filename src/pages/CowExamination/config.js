export const cowExaminationFields = {
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
  disease: {
    type: 'select',
    label: 'Disease',
    required: true,
    options: [
      { value: 'fmd', label: 'Foot-and-Mouth Disease (FMD)' },
      { value: 'hmd', label: 'hoof-and-mouth disease (HMD)' },
      { value: 'lumpy_skin_disease', label: 'Lumpy Skin Disease' },
      { value: 'ruminal tympany', label: 'bloating' },
      { value: 'mastitis', label: 'Mastitis' },
      { value: 'foot_rot', label: 'Foot Rot' },
      { value: 'brucellosis', label: 'Brucellosis' },
      { value: 'bovine_respiratory_disease', label: 'Bovine Respiratory Disease' },
      { value: 'ketosis', label: 'Ketosis' },
      { value: 'milk_fever', label: 'Milk Fever' },
      { value: 'lameness', label: 'Lameness' },
      { value: 'parasitic_infestation', label: 'Parasitic Infestation' },
      { value: 'anthrax', label: 'Anthrax' },
      { value: 'blackleg', label: 'Blackleg' },
      { value: 'other', label: 'Other' },
    ],
  },
  symptoms: {
    type: 'string',
    label: 'Symptoms',
    required: true,
  },
  treatment: {
    type: 'string',
    label: 'Treatment',
    required: true,
  },
  entryDate: {
    type: 'date',
    label: 'Examination Date',
    required: true,
  },
  nextCheckupDate: {
    type: 'date',
    label: 'Next Checkup Date',
  },
  notes: {
    type: 'string',
    label: 'Notes',
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
