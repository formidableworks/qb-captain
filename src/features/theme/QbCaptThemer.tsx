import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectTheme } from './themeSelectors';

interface Props {
  children: React.ReactNode;
}

export const QbtCaptThemer = ({ children }: Props): JSX.Element => {
  const qbCaptTheme = useSelector(selectTheme);
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: qbCaptTheme.primary,
      },
      secondary: {
        main: qbCaptTheme.secondary,
      },
      type: qbCaptTheme.type,
    },
  });
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
