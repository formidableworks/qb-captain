import { AppBar, Dialog, Toolbar, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import SettingsIcon from '@material-ui/icons/Settings';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      fontWeight: 'bold',
      color: theme.palette.primary.main,
    },
  })
);

export function SettingsFullScreenDialog(): JSX.Element {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const open = location.pathname === '/settings';

  const handleClose = (): void => {
    history.goBack();
  };

  return (
    <Dialog fullScreen hideBackdrop open={open}>
      <AppBar className={classes.appBar} elevation={0} color="transparent">
        <Toolbar>
          <SettingsIcon color="primary" />
          <Typography variant="button" className={classes.title}>
            Settings
          </Typography>
        </Toolbar>
      </AppBar>
      <div>settings content</div>
    </Dialog>
  );
}
