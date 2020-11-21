import { createReducer } from '@reduxjs/toolkit';
import { MaindataResponse } from '../../api/generated-types/Maindata.response';
import { toggleDiscreteFilter } from './syncActions';
import { maindataThunk } from './syncThunks';

interface SyncState {
  filters: {
    tags: string[];
    categories: string[];
    states: string[];
  };
  quickFilter: string;
  isMaindataPending: boolean;
  maindata: MaindataResponse;
}

const initialState: SyncState = {
  filters: {
    tags: [],
    categories: [],
    states: [],
  },
  quickFilter: '',
  isMaindataPending: false,
  maindata: {
    rid: 0,
    full_update: true,
    torrents: {},
    server_state: {
      connection_status: 'disconnected',
      dl_info_speed: 0,
    },
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
    })
    .addCase(toggleDiscreteFilter, (draftState, action) => {
      const { tags, categories, states } = draftState.filters;
      const { filterType, filterValue } = action.payload;
      switch (filterType) {
        case 'tags':
          draftState.filters.tags = tags.includes(filterValue)
            ? tags.filter((tag) => tag !== filterValue)
            : [...tags, filterValue];
          break;
        case 'categories':
          draftState.filters.categories = categories.includes(filterValue)
            ? categories.filter((cat) => cat !== filterValue)
            : [...categories, filterValue];
          break;
        case 'states':
          draftState.filters.states = states.includes(filterValue)
            ? states.filter((state) => state !== filterValue)
            : [...states, filterValue];
          break;
        default:
          throw new Error(`unexpected filterType value: ${filterType}`);
      }
    });
});
