import { useEffect } from 'react';
import './App.css';
import Router from './Router';
import { useDispatch } from 'react-redux';
import { getAllUsers } from './Features/Users/userSlice';


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    (async()=>{
      dispatch(getAllUsers());
    })()
  }, []);

  return (
    <div>
        <Router/>
    </div>
  );
}

export default App;
