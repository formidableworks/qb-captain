import { createSelector } from '@reduxjs/toolkit';
import { TorrentInfo } from '../../api/generated-types/Maindata.response';
import { RootState } from '../../app/store';

export const selectIsMaindataPending = (state: RootState): boolean => state.sync.isMaindataPending;

export const selectMaindataTorrents = (state: RootState): TorrentInfo[] =>
  Object.values(state.sync.maindata.torrents);

export const selectQuickFilter = (state: RootState): string => state.sync.quickFilter;

export const selectTagFilters = (state: RootState): string[] => state.sync.filters.tags;
export const selectCategoryFilters = (state: RootState): string[] => state.sync.filters.categories;
export const selectStateFilters = (state: RootState): string[] => state.sync.filters.states;

export const selectFilteredTorrents = createSelector(
  [selectMaindataTorrents, selectQuickFilter, selectTagFilters],
  (torrentList, quickFilterValue, tagFilters) => {
    const filteredByQuickFilter =
      quickFilterValue.length === 0
        ? torrentList
        : torrentList.filter((torrent) =>
            torrent.name.toLowerCase().includes(quickFilterValue.toLowerCase())
          );
    const filteredByTags =
      tagFilters.length === 0
        ? filteredByQuickFilter
        : filteredByQuickFilter.filter((torrent) => {
            const torrentTagArray = torrent.tags.split(', ');
            return torrentTagArray.some((torrentTag) => tagFilters.includes(torrentTag));
          });
    return filteredByTags;
  }
);
