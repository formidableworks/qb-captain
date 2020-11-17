import { AppBar, Dialog, DialogContent, Toolbar, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import React from 'react';
import { LoginForm } from './LoginForm';

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
    content: {
      display: 'flex',
      alignItems: 'center',
    },
  })
);

export function LoginDialog(): JSX.Element {
  const classes = useStyles();

  return (
    <Dialog fullScreen hideBackdrop open>
      <AppBar className={classes.appBar} elevation={0} color="transparent">
        <Toolbar>
          <VpnKeyIcon color="primary" />
          <Typography variant="button" className={classes.title}>
            Login
          </Typography>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <LoginForm />
      </DialogContent>
    </Dialog>
  );
}
