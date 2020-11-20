import { createSelector } from '@reduxjs/toolkit';
import { TorrentInfo } from '../../api/generated-types/Maindata.response';
import { RootState } from '../../app/store';

export const selectIsMaindataPending = (state: RootState): boolean => state.sync.isMaindataPending;

export const selectMaindataTorrents = (state: RootState): TorrentInfo[] =>
  Object.values(state.sync.maindata.torrents);

export const selectQuickFilter = (state: RootState): string => state.sync.quickFilter;

export const selectFilteredTorrents = createSelector(
  [selectMaindataTorrents, selectQuickFilter],
  (torrentList, quickFilterValue) => {
    const filteredByQuickFilter =
      quickFilterValue.length === 0
        ? torrentList
        : torrentList.filter((torrent) =>
            torrent.name.toLowerCase().includes(quickFilterValue.toLowerCase())
          );
    return filteredByQuickFilter;
  }
);
