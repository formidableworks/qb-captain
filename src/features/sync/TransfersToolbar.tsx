import { Button, TextField } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import FilterListIcon from '@material-ui/icons/FilterList';
import SortIcon from '@material-ui/icons/Sort';
import React from 'react';
import { MaindataControl } from './MaindataControl';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    TransfersToolbarRoot: {
      display: 'flex',
      height: 34,
      paddingLeft: theme.spacing(0.5),
      paddingRight: theme.spacing(0.5),
    },
    marginRight: {
      marginRight: theme.spacing(0.5),
    },
    inputRoot: {
      height: 34,
    },
    spacer: {
      flexGrow: 1,
    },
  })
);

export const TransfersToolbar = (): JSX.Element => {
  const classes = useStyles();
  return (
    <div className={classes.TransfersToolbarRoot}>
      <TextField
        className={classes.marginRight}
        InputProps={{ classes: { root: classes.inputRoot } }}
        variant="outlined"
        placeholder="Quick filter"
        size="small"
      />
      <div className={classes.spacer} />
      <Button className={classes.marginRight} size="small" startIcon={<FilterListIcon />}>
        Filter
      </Button>
      <Button className={classes.marginRight} size="small" startIcon={<SortIcon />}>
        Sort
      </Button>
      <MaindataControl intervalTime={5000} numberOfSegments={8} />
    </div>
  );
};
