import { CircularProgress, IconButton } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import RefreshIcon from '@material-ui/icons/Refresh';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsMaindataPending } from './syncSelectors';
import { maindataThunk } from './syncThunks';

const useStyles = makeStyles(() =>
  createStyles({
    iconNegativeMargin: {
      marginLeft: -26,
    },
  })
);

interface Props {
  intervalTime: number;
  numberOfSegments: number;
}
export function MaindataControl({ intervalTime, numberOfSegments }: Props): JSX.Element {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isMaindataPending = useSelector(selectIsMaindataPending);
  const [progress, setProgress] = React.useState(100 / numberOfSegments);

  const triggerThunk = (): void => {
    if (isMaindataPending) {
      console.warn(
        'triggerThunk was called before previous request had completed, consider reducing the update rate.'
      );
    } else {
      dispatch(maindataThunk({ rid: 0 }));
    }
  };

  React.useEffect(() => {
    triggerThunk(); // immediately dispatch a thunk on mount.
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 100 / numberOfSegments
      );
    }, intervalTime / numberOfSegments);
    return () => {
      clearInterval(timer);
    };
  }, []);

  React.useEffect(() => {
    if (progress === 0) {
      triggerThunk();
    }
  }, [progress]);

  return (
    <IconButton size="small" aria-label="refresh transfers" onClick={triggerThunk}>
      <RefreshIcon />
      <CircularProgress
        classes={{ root: classes.iconNegativeMargin }}
        thickness={3}
        size={28}
        variant="static"
        value={progress}
      />
    </IconButton>
  );
}
