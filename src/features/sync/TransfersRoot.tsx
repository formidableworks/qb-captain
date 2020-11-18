import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { MaindataControl } from './MaindataControl';
import { TorrentList } from './TorrentList';
import { TransfersToolbar } from './TransfersToolbar';

const useStyles = makeStyles((theme: Theme) =>
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
      <TorrentList />
      <MaindataControl />
    </div>
  );
};
