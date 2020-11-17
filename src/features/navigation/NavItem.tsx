import { IconButton, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    activeColor: {
      color: theme.palette.primary.main,
    },
    showText: {
      maxWidth: 100,
      transition: 'max-width 0.3s, opacity 0.3s',
      opacity: 1,
      overflow: 'clip',
      fontWeight: 'bold',
      color: theme.palette.primary.main,
    },
    hideText: {
      maxWidth: 0,
      transition: 'max-width 0.1s, opacity 0.1s',
      opacity: 0,
      overflow: 'clip',
    },
  })
);

interface Props {
  icon: React.ReactNode;
  text: string;
  ariaLabel: string;
  href: string;
}

export function NavItem(props: Props): JSX.Element {
  const classes = useStyles();
  const location = useLocation();
  const isActive = props.href.includes(location.pathname);
  return (
    <>
      <IconButton
        classes={{ ...(isActive && { root: classes.activeColor }) }}
        href={props.href}
        aria-label={props.ariaLabel}
      >
        {props.icon}
      </IconButton>

      <Typography variant="button" className={isActive ? classes.showText : classes.hideText}>
        {props.text}
      </Typography>
    </>
  );
}
