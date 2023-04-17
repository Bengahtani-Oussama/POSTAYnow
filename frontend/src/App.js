import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Profile from './pages/profile';
import Activate from './pages/home/activate';
import Reset from './pages/reset';
import CreatePostPopup from './components/createPostPopup';
import { useSelector } from 'react-redux';
import LoggedInRoutes from './routes/LoggedInRoutes';
import NotLoggedInRoutes from './routes/NotLoggedInRoutes';
import { useEffect, useReducer } from 'react';
import { postsReducer } from './reducers/reducers';
import axios from 'axios';
import { getError } from './utils/error/error';

function App() {
  const { user } = useSelector((state) => ({ ...state }));
  const { post } = useSelector((post) => ({ ...post }));

 
  return (
    <div>
      {post && <CreatePostPopup user={user} />}

      <Routes>
        <Route element={<LoggedInRoutes />}>
          <Route path='/profile' element={<Profile />} exact />
          <Route path='/profile/:username' element={<Profile />} exact />
          <Route path='/' element={<Home  />} exact />
          <Route path='/activate/:token' element={<Activate />} exact />
        </Route>
        <Route element={<NotLoggedInRoutes />}>
          <Route path='/login' element={<Login />} exact />
        </Route>
        <Route path='/reset' element={<Reset />} />
      </Routes>
    </div>
  );
}

export default App;
