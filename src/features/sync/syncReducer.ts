import { createReducer } from '@reduxjs/toolkit';
import { MaindataResponse } from '../../api/generated-types/Maindata.response';
import { maindataThunk } from './syncThunks';

interface SyncState {
  maindata: MaindataResponse;
}

const initialState: SyncState = {
  maindata: {
    rid: 0,
    full_update: true,
  },
};

export const syncReducer = createReducer(initialState, (builder) => {
  builder.addCase(maindataThunk.fulfilled, (draftState, action) => {
    if (action.payload.full_update) {
      draftState.maindata = action.payload;
    } else {
      // TODO: implement partial updates.
      console.log('partial update!');
    }
  });
});
