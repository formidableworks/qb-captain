import { Button } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import SortIcon from '@material-ui/icons/Sort';
import React from 'react';
import { FilterPopover } from './FilterPopover';
import { MaindataControl } from './MaindataControl';
import { QuickFilterTextField } from './QuickFilterTextField';

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
      <QuickFilterTextField />
      <div className={classes.spacer} />
      <FilterPopover />
      <Button className={classes.marginRight} size="small" startIcon={<SortIcon />}>
        Sort
      </Button>
      <MaindataControl intervalTime={5000} numberOfSegments={8} />
    </div>
  );
};
