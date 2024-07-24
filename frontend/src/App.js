import './App.css';
import { RouterProvider } from 'react-router-dom';

//router
import { router } from './common/routers/routes.js';

//redux
// import { useDispatch, useSelector } from 'react-redux';
// import { removeUser, setUser } from './store/actions/userActions';

//material ui 
import { ThemeProvider } from '@emotion/react';

//pages 
import { theme } from './common/utils/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
        <RouterProvider router={router} /> 
    </ThemeProvider>
  );
}

export default App;
