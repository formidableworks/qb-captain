import { Chip } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDiscreteFilter, ToggleFilterAction } from './syncActions';
import { selectTagFilters } from './syncSelectors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    filterChipsRoot: {
      paddingTop: theme.spacing(0.5),
      paddingLeft: theme.spacing(0.5),
    },
    chip: {
      marginBottom: theme.spacing(0.5),
      marginRight: theme.spacing(0.5),
    },
  })
);

export const FilterChips = (): JSX.Element => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const filterTags = useSelector(selectTagFilters);

  const onDeleteChip = (toggleFilter: ToggleFilterAction): void => {
    dispatch(toggleDiscreteFilter(toggleFilter));
  };
  return (
    <div className={classes.filterChipsRoot}>
      {filterTags.map((tag) => (
        <Chip
          label={tag}
          variant="outlined"
          size="small"
          className={classes.chip}
          deleteIcon={<CancelIcon />}
          onDelete={() => onDeleteChip({ filterType: 'tags', filterValue: tag })}
          icon={<LocalOfferIcon />}
        />
      ))}
    </div>
  );
};
