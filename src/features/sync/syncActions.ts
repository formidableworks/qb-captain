import { createAction } from '@reduxjs/toolkit';

export const setQuickFilter = createAction<string, 'sync/setQuickFilter'>('sync/setQuickFilter');
