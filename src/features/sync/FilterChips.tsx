import { Chip } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import CategoryIcon from '@material-ui/icons/Category';
import InfoIcon from '@material-ui/icons/Info';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDiscreteFilter, ToggleFilterAction } from './syncActions';
import { selectCategoryFilters, selectStateFilters, selectTagFilters } from './syncSelectors';

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
  const filterCategories = useSelector(selectCategoryFilters);
  const filterTorrentStates = useSelector(selectStateFilters);

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
      {filterCategories.map((category) => (
        <Chip
          label={category}
          variant="outlined"
          size="small"
          className={classes.chip}
          deleteIcon={<CancelIcon />}
          onDelete={() => onDeleteChip({ filterType: 'categories', filterValue: category })}
          icon={<CategoryIcon />}
        />
      ))}
      {filterTorrentStates.map((torrentState) => (
        <Chip
          label={torrentState}
          variant="outlined"
          size="small"
          className={classes.chip}
          deleteIcon={<CancelIcon />}
          onDelete={() => onDeleteChip({ filterType: 'states', filterValue: torrentState })}
          icon={<InfoIcon />}
        />
      ))}
    </div>
  );
};
