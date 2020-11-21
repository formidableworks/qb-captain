import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { FilterChips } from './FilterChips';
import { TorrentList } from './TorrentList';
import { TransfersToolbar } from './TransfersToolbar';

const useStyles = makeStyles(() =>
  createStyles({
    TransfersRootRoot: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
    },
  })
);

export const TransfersRoot = (): JSX.Element => {
  const classes = useStyles();
  return (
    <div className={classes.TransfersRootRoot}>
      <TransfersToolbar />
      <FilterChips />
      <TorrentList />
    </div>
  );
};
