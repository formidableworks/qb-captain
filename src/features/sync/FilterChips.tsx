import { Chip } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import CategoryIcon from '@material-ui/icons/Category';
import InfoIcon from '@material-ui/icons/Info';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { getQueryFilters, removeQueryFilters } from './torrentListQueryFilters';

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
  const history = useHistory();
  const queryFilters = getQueryFilters(history.location);

  return (
    <div className={classes.filterChipsRoot}>
      {queryFilters.tags.map((tag) => (
        <Chip
          label={tag}
          variant="outlined"
          size="small"
          className={classes.chip}
          deleteIcon={<CancelIcon />}
          onDelete={() => removeQueryFilters({ tags: [tag] }, history)}
          icon={<LocalOfferIcon />}
        />
      ))}
      {queryFilters.categories.map((category) => (
        <Chip
          label={category}
          variant="outlined"
          size="small"
          className={classes.chip}
          deleteIcon={<CancelIcon />}
          onDelete={() => removeQueryFilters({ categories: [category] }, history)}
          icon={<CategoryIcon />}
        />
      ))}
      {queryFilters.states.map((torrentState) => (
        <Chip
          label={torrentState}
          variant="outlined"
          size="small"
          className={classes.chip}
          deleteIcon={<CancelIcon />}
          onDelete={() => removeQueryFilters({ states: [torrentState] }, history)}
          icon={<InfoIcon />}
        />
      ))}
    </div>
  );
};
