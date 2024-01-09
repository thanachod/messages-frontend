import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login';

import 'bootstrap/dist/css/bootstrap.min.css';
import Feeds from './pages/Feeds';
import Signup from './pages/Signup';
import CreateMessage from './pages/CreateMessage';
import EditMessage from './pages/EditMessage';

//axios
import axios from 'axios';
import Account from './pages/Account';
import { useEffect, useMemo, useState } from 'react';
import { UserContext } from './context/UserContext';
axios.defaults.baseURL = 'https://messages-cexd.onrender.com'; //'http://localhost:4000'
axios.defaults.withCredentials = true; //not to include every time again.

function App() {

  const [user, setUser] = useState(null);
  const providerValue = useMemo(() => ({ user, setUser}), [user, setUser]);

  
  useEffect(() => {
    if (!user){
      axios.get('users/check-auth')
      .then(({data}) => {
        
        setUser(data.user);
        console.log(data.user);
      });
    }
  }, [])
  
  
  return (
    <BrowserRouter basename='/messages-frontend.onrender.com'>
    <UserContext.Provider value={providerValue}>
      <Routes>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/feeds' element={<Feeds />}/>
        <Route path='/account' element={<Account />}/>
        <Route path='/create-message' element={<CreateMessage />}/>
        <Route path='/edit-message' element={<EditMessage />}/>
        <Route path='/edit-message/:msgId' element={<EditMessage />}/>

      </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
