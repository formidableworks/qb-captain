import { Divider, LinearProgress, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { TorrentInfo } from '../../api/generated-types/Maindata.response';
import { StateChip } from './StateChip';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    TorrentItemRoot: {
      padding: theme.spacing(1),
    },
    chipContainer: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(0.5), // uneven value - the chips themselves have merginBottom of  spacing(0.5)
    },
  })
);

interface Props {
  // data, index & style are provided by parent component (react-window's FixedSizeList)
  data: unknown;
  index: number;
  style: React.CSSProperties;
}
export const TorrentItem = ({ data, index, style }: Props): JSX.Element => {
  const classes = useStyles();
  const torrentList = data as TorrentInfo[];
  const torrentInfo = torrentList[index];
  return (
    <div style={style} className={classes.TorrentItemRoot}>
      <Typography variant="h6">{torrentInfo.name}</Typography>
      <LinearProgress variant="determinate" value={torrentInfo.progress * 100} />
      <div className={classes.chipContainer}>
        <StateChip torrentState={torrentInfo.state} />
      </div>
      <Divider />
    </div>
  );
};
