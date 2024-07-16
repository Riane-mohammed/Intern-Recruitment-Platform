import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser, setUser } from './store/actions/userActions';
import LoginForm from './pages/admin/LoginForm';
import './index.css';
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
   <div>  
   <LoginForm/>
   </div>
  );
}

export default App;
