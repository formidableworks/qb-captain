import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsMaindataPending } from './syncSelectors';
import { maindataThunk } from './syncThunks';
// TODO: move to props.
const refreshTime = 5000;
const segments = 8;
export function MaindataControl(): JSX.Element {
  const dispatch = useDispatch();
  const isMaindataPending = useSelector(selectIsMaindataPending);
  const [progress, setProgress] = React.useState((100 / segments) * (segments - 1));

  const triggerThunk = (): void => {
    if (isMaindataPending) {
      console.warn(
        'triggerThunk was called before previous request had completed, consider reducing update rate.'
      );
    } else {
      dispatch(maindataThunk({ rid: 0 }));
    }
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 100 / segments));
    }, refreshTime / segments);
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
    <div>
      <button type="button" onClick={triggerThunk}>
        getMaindata
      </button>
      <CircularProgress variant="static" value={progress} />
    </div>
  );
}
