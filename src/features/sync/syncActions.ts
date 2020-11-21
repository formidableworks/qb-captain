import { createAction } from '@reduxjs/toolkit';

export const setQuickFilter = createAction<string, 'sync/setQuickFilter'>('sync/setQuickFilter');

export interface ToggleFilterAction {
  filterType: 'tags' | 'categories' | 'states';
  filterValue: string;
}
export const toggleDiscreteFilter = createAction<ToggleFilterAction, 'sync/toggleDiscreteFilter'>(
  'sync/toggleDiscreteFilter'
);
