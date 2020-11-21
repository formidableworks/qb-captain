import { Button, Popover } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import FilterListIcon from '@material-ui/icons/FilterList';
import React from 'react';
import { FilterPopoverContents } from './FilterPopoverContents';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    filterMenuRoot: {},
    marginRight: {
      marginRight: theme.spacing(0.5),
    },
  })
);

export const FilterPopover = (): JSX.Element => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<undefined | HTMLElement>(undefined);

  const handleClickFilterButton = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(undefined);
  };

  return (
    <>
      <Button
        onClick={handleClickFilterButton}
        className={classes.marginRight}
        size="small"
        startIcon={<FilterListIcon />}
      >
        Filter
      </Button>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <FilterPopoverContents />
      </Popover>
    </>
  );
};
