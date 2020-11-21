import { Checkbox, FormControlLabel, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CategoryIcon from '@material-ui/icons/Category';
import InfoIcon from '@material-ui/icons/Info';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TorrentInfo } from '../../api/generated-types/Maindata.response';
import { toggleDiscreteFilter } from './syncActions';
import {
  selectCategoryFilters,
  selectMaindataTorrents,
  selectStateFilters,
  selectTagFilters,
} from './syncSelectors';

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
    },
    headingIcon: {
      width: '0.75em',
      height: '0.75em',
      marginRight: theme.spacing(1),
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
  const torrentList = useSelector(selectMaindataTorrents);
  const tagFilters = useSelector(selectTagFilters);
  const categoryFilters = useSelector(selectCategoryFilters);
  const torrentStateFilters = useSelector(selectStateFilters);

  const dispatch = useDispatch();

  const uniqueTags = getUniqueTags(torrentList);
  const uniqueCategories = getUniqueCategories(torrentList);
  const uniqueTorrentStates = getUniqueTorrentStates(torrentList);

  const handleChangeTag = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(toggleDiscreteFilter({ filterType: 'tags', filterValue: event.target.name }));
  };
  const handleChangeCategory = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(toggleDiscreteFilter({ filterType: 'categories', filterValue: event.target.name }));
  };
  const handleChangeTorrentState = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(toggleDiscreteFilter({ filterType: 'states', filterValue: event.target.name }));
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
          control={
            <Checkbox
              checked={tagFilters.includes(tag)}
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
          control={
            <Checkbox
              checked={categoryFilters.includes(category)}
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
          control={
            <Checkbox
              checked={torrentStateFilters.includes(torrentState)}
              onChange={handleChangeTorrentState}
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
