import React from 'react';
import { useDispatch } from 'react-redux';
import { maindataThunk } from './syncThunks';

export function MainDataControl(): JSX.Element {
  const dispatch = useDispatch();

  const handleGetMaindataButtonClick = (): void => {
    dispatch(maindataThunk({ rid: 0 }));
  };

  return (
    <button type="button" onClick={handleGetMaindataButtonClick}>
      getMaindata
    </button>
  );
}
