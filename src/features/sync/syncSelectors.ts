import { TorrentInfo } from '../../api/generated-types/Maindata.response';
import { RootState } from '../../app/store';

export const selectIsMaindataPending = (state: RootState): boolean => state.sync.isMaindataPending;
export const selectMaindataTorrents = (state: RootState): TorrentInfo[] =>
  Object.values(state.sync.maindata.torrents);
export const selectMaindataTorrentByIndex = (index: number) => (state: RootState): TorrentInfo =>
  Object.values(state.sync.maindata.torrents)[index];
