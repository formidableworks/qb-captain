import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { authReducer } from '../features/authentication/authReducer';
import { syncReducer } from '../features/sync/syncReducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sync: syncReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
