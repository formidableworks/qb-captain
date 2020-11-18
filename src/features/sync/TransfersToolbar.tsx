import { Button, IconButton } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import FilterListIcon from '@material-ui/icons/FilterList';
import RefreshIcon from '@material-ui/icons/Refresh';
import SortIcon from '@material-ui/icons/Sort';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    TransfersToolbarRoot: {
      display: 'flex',
      flexDirection: 'row-reverse',
    },
    button: {
      marginRight: theme.spacing(0.5),
    },
  })
);

export const TransfersToolbar = (): JSX.Element => {
  const classes = useStyles();
  return (
    <div className={classes.TransfersToolbarRoot}>
      <IconButton className={classes.button} size="small" aria-label="refresh transfers">
        <RefreshIcon />
      </IconButton>
      <Button className={classes.button} size="small" startIcon={<SortIcon />}>
        Sort
      </Button>
      <Button className={classes.button} size="small" startIcon={<FilterListIcon />}>
        Filter
      </Button>
    </div>
  );
};
