import AppBar from '@material-ui/core/AppBar';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import RssFeedIcon from '@material-ui/icons/RssFeed';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react';
import { NavItem } from './NavItem';
import { NavMenu } from './NavMenu';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    spacer: {
      flexGrow: 1,
    },
  })
);

export function QbCaptAppBar(): JSX.Element {
  const classes = useStyles();

  return (
    <AppBar position="static" elevation={0} color="transparent">
      <Toolbar disableGutters classes={{ root: classes.toolbar }}>
        <NavItem
          icon={<ImportExportIcon />}
          text="Transfers"
          ariaLabel="transfers"
          href="#/transfers"
        />
        <NavItem icon={<SearchIcon />} text="Search" ariaLabel="search" href="#/search" />
        <NavItem icon={<RssFeedIcon />} text="RSS" ariaLabel="search" href="#/rss" />
        <div className={classes.spacer} />
        <NavMenu />
      </Toolbar>
    </AppBar>
  );
}
