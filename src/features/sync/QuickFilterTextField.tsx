import { IconButton, InputAdornment, TextField } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setQuickFilter } from './syncActions';
import { selectQuickFilter } from './syncSelectors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    QuickFilterTextFieldRoot: {},
    marginRight: {
      marginRight: theme.spacing(0.5),
    },
    inputRoot: {
      height: 34,
      paddingRight: theme.spacing(0.5),
    },
    inputInput: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    inputAdornment: {
      opacity: 0,
      transition: 'opacity 0.3s',
    },
    inputAdornmentActive: {
      opacity: 1,
      transition: 'opacity 0.3s',
    },
  })
);

const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>): void => {
  event.preventDefault();
};

export const QuickFilterTextField = (): JSX.Element => {
  const classes = useStyles();
  const quickFilterValue = useSelector(selectQuickFilter);
  const dispatch = useDispatch();
  const handleQuickFilterOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(setQuickFilter(event.target.value));
  };
  const handleClickClearQuickFilter = (): void => {
    dispatch(setQuickFilter(''));
  };

  return (
    <TextField
      value={quickFilterValue}
      onChange={handleQuickFilterOnChange}
      className={classes.marginRight}
      InputProps={{
        classes: { root: classes.inputRoot, input: classes.inputInput },
        endAdornment: (
          <InputAdornment
            classes={{
              root:
                quickFilterValue.length > 0 ? classes.inputAdornmentActive : classes.inputAdornment,
            }}
            position="end"
          >
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickClearQuickFilter}
              onMouseDown={handleMouseDownPassword}
              size="small"
            >
              <CancelIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
      variant="outlined"
      placeholder="Quick filter"
      size="small"
    />
  );
};
