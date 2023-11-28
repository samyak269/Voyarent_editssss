import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from 'themes/default.theme';
import GlobalStyles from 'themes/global.style';
import AuthProvider from 'context/AuthProvider';
import AppRoutes from './router';
import 'antd/dist/reset.css';

const App = () => (
  <ThemeProvider theme={theme}>
    <React.Fragment>
      <GlobalStyles />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </React.Fragment>
  </ThemeProvider>
);
const root = createRoot(document.getElementById('root'));
root.render(<App />);
