import { PaletteType } from '@material-ui/core';
import { RootState } from '../../app/store';
import { ThemeState } from './themeReducer';

export const selectTheme = (state: RootState): ThemeState => state.theme;
export const selectThemeType = (state: RootState): PaletteType => state.theme.type;
