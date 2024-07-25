import './App.css';

//router
import { RouterProvider } from 'react-router-dom';
import { router } from './common/routers/routes.js';

//material ui 
import { ThemeProvider } from '@emotion/react';

//theme 
import { theme } from './common/utils/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
        <RouterProvider router={router} /> 
    </ThemeProvider>
  );
}

export default App;
