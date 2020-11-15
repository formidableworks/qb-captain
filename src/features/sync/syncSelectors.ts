import { RootState } from '../../app/store';

export const selectIsAuthd = (state: RootState): boolean => state.auth.isAuthorised;
