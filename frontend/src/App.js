import './App.css';
import { RouterProvider } from 'react-router-dom';

//router import
// import { router } from './common/routers/adminRoutes.js';
import { quizRouter } from './common/routers/quizRoutes.js';

//redux import
// import { useDispatch, useSelector } from 'react-redux';
// import { removeUser, setUser } from './store/actions/userActions';

//material ui import
import { ThemeProvider } from '@emotion/react';

//pages import
import LoginForm from './modules/admin/ui/LoginForm.jsx';
import { theme } from './common/utils/theme';




function App() {
  const user = 1;
  
  return (
    <ThemeProvider theme={theme}>
      {user ? (
        //<RouterProvider router={router} />
        <RouterProvider router={quizRouter} />
      ) : (
        <LoginForm/>
      )}
    </ThemeProvider>
  );
}

export default App;
