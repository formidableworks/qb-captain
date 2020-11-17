import { Button, TextField } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import React from 'react';
import { useDispatch } from 'react-redux';
import { loginThunk } from './authThunks';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flexGrow: 1,
    },
    superIcon: {
      width: '5em',
      height: '5em',
      marginBottom: theme.spacing(2),
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    bottomMargin: {
      marginBottom: theme.spacing(2),
    },
  })
);

export function LoginForm(): JSX.Element {
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const form = new FormData(event.target as HTMLFormElement);
    const username = form.get('usr') as string;
    const password = form.get('pwd') as string;
    dispatch(loginThunk({ username, password }));
  };

  return (
    <div className={classes.root}>
      <AccountCircleIcon className={classes.superIcon} color="disabled" />
      <form onSubmit={handleFormSubmit} className={classes.form}>
        <TextField
          className={classes.bottomMargin}
          variant="outlined"
          label="Username"
          name="usr"
          size="small"
        />
        <TextField
          className={classes.bottomMargin}
          variant="outlined"
          label="Password"
          name="pwd"
          type="password"
          size="small"
        />
        <Button type="submit" variant="outlined" color="primary">
          Login
        </Button>
      </form>
    </div>
  );
}
