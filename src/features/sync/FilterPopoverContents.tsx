import { Checkbox, FormControlLabel } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TorrentInfo } from '../../api/generated-types/Maindata.response';
import { toggleDiscreteFilter } from './syncActions';
import { selectMaindataTorrents, selectTagFilters } from './syncSelectors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    FilterPopoverContentsRoot: {
      padding: theme.spacing(1),
      display: 'flex',
      flexDirection: 'column',
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

export const FilterPopoverContents = (): JSX.Element => {
  const classes = useStyles();
  const torrentList = useSelector(selectMaindataTorrents);
  const tagFilters = useSelector(selectTagFilters);
  const dispatch = useDispatch();

  const uniqueTags = getUniqueTags(torrentList);
  const handleChangeTag = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(toggleDiscreteFilter({ filterType: 'tags', filterValue: event.target.name }));
  };
  return (
    <div className={classes.FilterPopoverContentsRoot}>
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
    </div>
  );
};
