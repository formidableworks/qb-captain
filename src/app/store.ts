import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { authReducer } from '../features/authentication/authReducer';
import { syncReducer } from '../features/sync/syncReducer';
import { themeReducer } from '../features/theme/themeReducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sync: syncReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
