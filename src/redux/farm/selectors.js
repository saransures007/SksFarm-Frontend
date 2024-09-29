import { createSelector } from 'reselect';

const selectsks = (state) => state.sks;

export const selectCurrentItem = createSelector([selectsks], (sks) => sks.current);

export const selectListItems = createSelector([selectsks], (sks) => sks.list);
export const selectItemById = (itemId) =>
  createSelector(selectListItems, (list) => list.result.items.find((item) => item._id === itemId));

export const selectCreatedItem = createSelector([selectsks], (sks) => sks.create);

export const selectUpdatedItem = createSelector([selectsks], (sks) => sks.update);

export const selectRecordPaymentItem = createSelector([selectsks], (sks) => sks.recordPayment);

export const selectReadItem = createSelector([selectsks], (sks) => sks.read);

export const selectDeletedItem = createSelector([selectsks], (sks) => sks.delete);

export const selectSearchedItems = createSelector([selectsks], (sks) => sks.search);
export const selectMailItem = createSelector([selectsks], (sks) => sks.mail);
