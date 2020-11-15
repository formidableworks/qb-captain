import { AsyncThunk, createReducer } from '@reduxjs/toolkit';
import { loginThunk, logoutThunk } from './authThunks';

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;

interface AuthState {
  isAuthorised: boolean;
}

const initialState: AuthState = {
  isAuthorised: true,
};

export const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loginThunk.fulfilled, (draftState, action) => {
      if (action.payload === 'Ok.') {
        draftState.isAuthorised = true;
      } else {
        draftState.isAuthorised = false;
      }
    })
    .addCase(logoutThunk.fulfilled, (draftState) => {
      draftState.isAuthorised = false;
    })
    .addMatcher(
      (action): action is RejectedAction =>
        action.type.endsWith('/rejected') &&
        action.error.message === 'Request failed with status code 403',
      (draftState) => {
        draftState.isAuthorised = false;
      }
    );
});
