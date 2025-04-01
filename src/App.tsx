import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './styles/themes/default.ts';
import { GlobalStyle } from './styles/global.ts';
import { Router } from './routes/Router.tsx';

export function App() {
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
        <GlobalStyle />
      </ThemeProvider>
    </>
  );
}
