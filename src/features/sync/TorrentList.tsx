import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import AutoSizer, { Size } from 'react-virtualized-auto-sizer';
import { FixedSizeList } from 'react-window';
import { selectMaindataTorrents } from './syncSelectors';
import { TorrentItem } from './TorrentItem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    TorrentListRoot: {
      flexGrow: 1,
    },
  })
);

export const TorrentList = (): JSX.Element => {
  const classes = useStyles();
  const torrents = useSelector(selectMaindataTorrents);
  return (
    <div className={classes.TorrentListRoot}>
      <AutoSizer>
        {({ height, width }: Size) => (
          <FixedSizeList height={height} width={width} itemCount={torrents.length} itemSize={35}>
            {TorrentItem}
          </FixedSizeList>
        )}
      </AutoSizer>
    </div>
  );
};
