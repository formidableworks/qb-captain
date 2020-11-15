import { createReducer } from '@reduxjs/toolkit';
import { MaindataResponse } from '../../api/generated-types/Maindata.response';
import { maindataThunk } from './syncThunks';

interface SyncState {
  isMaindataPending: boolean;
  maindata: MaindataResponse;
}

const initialState: SyncState = {
  isMaindataPending: false,
  maindata: {
    rid: 0,
    full_update: true,
  },
};

export const syncReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(maindataThunk.fulfilled, (draftState, action) => {
      draftState.isMaindataPending = false;
      if (action.payload.full_update) {
        draftState.maindata = action.payload;
      } else {
        // TODO: implement partial updates.
        console.log('partial update!');
      }
    })
    .addCase(maindataThunk.pending, (draftState) => {
      draftState.isMaindataPending = true;
    })
    .addCase(maindataThunk.rejected, (draftState) => {
      draftState.isMaindataPending = false;
    });
});
