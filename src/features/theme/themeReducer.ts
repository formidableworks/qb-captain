import { PaletteType } from '@material-ui/core';
import { blue, deepOrange } from '@material-ui/core/colors';
import { createReducer } from '@reduxjs/toolkit';
import { toggleThemeType } from './themeActions';

export interface ThemeState {
  primary: string;
  secondary: string;
  type: PaletteType;
}

const initialState: ThemeState = {
  primary: blue[500],
  secondary: deepOrange[500], // orange 500
  type: 'light',
};

export const themeReducer = createReducer(initialState, (builder) => {
  builder.addCase(toggleThemeType, (draftState) => {
    draftState.type = draftState.type === 'light' ? 'dark' : 'light';
  });
});
