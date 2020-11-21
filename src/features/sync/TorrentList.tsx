import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import AutoSizer, { Size } from 'react-virtualized-auto-sizer';
import { FixedSizeList } from 'react-window';
import { selectFilteredTorrents } from './syncSelectors';
import { TorrentItem } from './TorrentItem';

const useStyles = makeStyles(() =>
  createStyles({
    TorrentListRoot: {
      flexGrow: 1,
    },
  })
);

export const TorrentList = (): JSX.Element => {
  const classes = useStyles();
  const torrents = useSelector(selectFilteredTorrents);
  return (
    <div className={classes.TorrentListRoot}>
      <AutoSizer>
        {({ height, width }: Size) => (
          <FixedSizeList
            itemData={torrents}
            height={height}
            width={width}
            itemCount={torrents.length}
            itemSize={100}
          >
            {TorrentItem}
          </FixedSizeList>
        )}
      </AutoSizer>
    </div>
  );
};
