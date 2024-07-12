import { Button, ThemeProvider } from '@mui/material';
import './App.css';
import { theme } from './theme';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
// import SignIn from './pages/admin/SignIn';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser, setUser } from './store/actions/userActions';

function App() {
  const user = useSelector( state => state.user.user );
  const dispatch = useDispatch();

  
  const handleSet = ()=>{

    dispatch(setUser({
      name: 'med',
      role: 'admin',
      number: 1
    }));
  };

  const handleRemove = ()=>{
    dispatch(removeUser());
  };

  const handleDisplay = ()=>{
    console.log(user);
  };
  

  return (
    <ThemeProvider theme={theme}>
      {user ? (
        //<SignIn />
        <>
          <Button variant="outlined" onClick={handleSet}>SET</Button>
          <br/>
          <Button variant="outlined" onClick={handleRemove}>REMOVE</Button>
          <br/>
          <Button variant="outlined" onClick={handleDisplay}>DISPLAY</Button>
        </>
      ) : (
        <RouterProvider router={router} />
      )}
    </ThemeProvider>
  );
}

export default App;
