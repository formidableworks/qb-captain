import { RootState } from '../../app/store';

export const selectIsMaindataPending = (state: RootState): boolean => state.sync.isMaindataPending;
