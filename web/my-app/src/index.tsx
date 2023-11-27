import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CssBaseline, createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { orange } from '@mui/material/colors';
import { SnackbarProvider } from 'notistack';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const defaultTheme = createTheme({
  palette: {
    mode: 'dark'
  },
  typography: {
    button: {
      textTransform: 'capitalize',
    }
  }
});
root.render(
  <ThemeProvider theme={defaultTheme}>
    <CssBaseline enableColorScheme />
    <SnackbarProvider>
      <App />
    </SnackbarProvider>
  </ThemeProvider>
);
