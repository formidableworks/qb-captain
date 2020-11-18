import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { SettingsFullScreenDialog } from '../settings/SettingsFullScreenDialog';
import { QbCaptAppBar } from './QbCaptAppBar';

interface Props {
  children: React.ReactNode;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
    },
    content: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
    },
  })
);

export const AppShell = (props: Props): JSX.Element => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <QbCaptAppBar />
      <div className={classes.content}>{props.children}</div>
      <SettingsFullScreenDialog />
    </div>
  );
};
