import { Checkbox, FormControlLabel, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CategoryIcon from '@material-ui/icons/Category';
import InfoIcon from '@material-ui/icons/Info';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import React, { ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { TorrentInfo } from '../../api/generated-types/Maindata.response';
import { selectMaindataTorrents } from './syncSelectors';
import { addQueryFilters, getQueryFilters, removeQueryFilters } from './torrentListQueryFilters';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    FilterPopoverContentsRoot: {
      padding: theme.spacing(1),
      display: 'flex',
      flexDirection: 'column',
    },
    heading: {
      display: 'flex',
      alignItems: 'center',
      opacity: 0.7,
    },
    headingIcon: {
      marginRight: theme.spacing(0.5),
    },
    formControlLabel: {
      marginLeft: theme.spacing(-1),
    },
  })
);

const getUniqueTags = (torrentList: TorrentInfo[]): string[] =>
  torrentList
    .map((torrent) => torrent.tags)
    .reduce((accumulator, commaSepTags) => {
      if (commaSepTags.length === 0) return accumulator;
      const tagArray = commaSepTags.split(', ');
      return [...accumulator, ...tagArray];
    }, [] as string[])
    .reduce((accumulator, tag) => {
      if (accumulator.includes(tag)) {
        return accumulator;
      }
      return [...accumulator, tag];
    }, [] as string[]);

const getUniqueCategories = (torrentList: TorrentInfo[]): string[] =>
  torrentList
    .map((torrent) => torrent.category)
    .reduce((accumulator, category) => {
      if (accumulator.includes(category) || category.length === 0) {
        return accumulator;
      }
      return [...accumulator, category];
    }, [] as string[]);

const getUniqueTorrentStates = (torrentList: TorrentInfo[]): string[] =>
  torrentList
    .map((torrent) => torrent.state)
    .reduce((accumulator, state) => {
      if (accumulator.includes(state) || state.length === 0) {
        return accumulator;
      }
      return [...accumulator, state];
    }, [] as string[]);

export const FilterPopoverContents = (): JSX.Element => {
  const classes = useStyles();
  const history = useHistory();

  const torrentList = useSelector(selectMaindataTorrents);
  const uniqueTags = getUniqueTags(torrentList);
  const uniqueCategories = getUniqueCategories(torrentList);
  const uniqueTorrentStates = getUniqueTorrentStates(torrentList);

  const queryFilters = getQueryFilters(history.location);

  const handleChangeTag = (event: ChangeEvent<HTMLInputElement>, checked: boolean): void => {
    if (checked) {
      addQueryFilters({ tags: [event.target.name] }, history);
    } else {
      removeQueryFilters({ tags: [event.target.name] }, history);
    }
  };
  const handleChangeCategory = (event: ChangeEvent<HTMLInputElement>, checked: boolean): void => {
    if (checked) {
      addQueryFilters({ categories: [event.target.name] }, history);
    } else {
      removeQueryFilters({ categories: [event.target.name] }, history);
    }
  };
  const handleChangeState = (event: ChangeEvent<HTMLInputElement>, checked: boolean): void => {
    if (checked) {
      addQueryFilters({ states: [event.target.name] }, history);
    } else {
      removeQueryFilters({ states: [event.target.name] }, history);
    }
  };
  return (
    <div className={classes.FilterPopoverContentsRoot}>
      {uniqueTags.length > 0 && (
        <div className={classes.heading}>
          <LocalOfferIcon className={classes.headingIcon} />
          <Typography variant="subtitle2">Tags</Typography>
        </div>
      )}
      {uniqueTags.map((tag) => (
        <FormControlLabel
          className={classes.formControlLabel}
          control={
            <Checkbox
              checked={queryFilters.tags.includes(tag)}
              onChange={handleChangeTag}
              name={tag}
              color="primary"
            />
          }
          label={tag}
        />
      ))}
      {uniqueCategories.length > 0 && (
        <div className={classes.heading}>
          <CategoryIcon className={classes.headingIcon} />
          <Typography variant="subtitle2">Categories</Typography>
        </div>
      )}
      {uniqueCategories.map((category) => (
        <FormControlLabel
          className={classes.formControlLabel}
          control={
            <Checkbox
              checked={queryFilters.categories.includes(category)}
              onChange={handleChangeCategory}
              name={category}
              color="primary"
            />
          }
          label={category}
        />
      ))}
      {uniqueTorrentStates.length > 0 && (
        <div className={classes.heading}>
          <InfoIcon className={classes.headingIcon} />
          <Typography variant="subtitle2">Torrent states</Typography>
        </div>
      )}
      {uniqueTorrentStates.map((torrentState) => (
        <FormControlLabel
          className={classes.formControlLabel}
          control={
            <Checkbox
              checked={queryFilters.states.includes(torrentState)}
              onChange={handleChangeState}
              name={torrentState}
              color="primary"
            />
          }
          label={torrentState}
        />
      ))}
    </div>
  );
};
