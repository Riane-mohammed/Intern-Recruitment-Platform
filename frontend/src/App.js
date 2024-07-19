import './App.css';

//router import
import { RouterProvider } from 'react-router-dom';

//redux import
// import { useDispatch, useSelector } from 'react-redux';
// import { removeUser, setUser } from './store/actions/userActions';

//material ui import
import { ThemeProvider } from '@emotion/react';
import { router } from './common/routers/routes.js';

//pages import
import LoginForm from './modules/admin/ui/LoginForm.jsx';
import { theme } from './common/utils/theme';




function App() {
  const user = 1;
  
  return (
    <ThemeProvider theme={theme}>
      {user ? (
        <RouterProvider router={router} />
      ) : (
        <LoginForm/>
      )}
    </ThemeProvider>
  );
}

export default App;
