import React from 'react';
import { Route, Link, useHistory } from 'react-router-dom';
import axios from 'axios';

import PrivateRoute from './components/PrivateRoute';
import PostInput from './components/PostInput';
import Login from './components/Login';
import NewUser from './components/NewUser';
import Logo from './Assets/Reddit-logo.png';
import UpdatePost from './components/UpdatePost';

import './App.css';


function App() {
  const { push } = useHistory();

  const logout = () => {
    axios
      .get('https://post-here-heroku.herokuapp.com/api/auth/logout')
      .then(res => {
        console.log(res);
        if (localStorage.getItem('token')) {
          localStorage.removeItem('token');
        }
        push('/login');
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <div className="App">
      <header>
        <div className="logo">
          <img src={Logo} alt="Reddit Logo"/>
          <h1>post here</h1>
        </div>
        <ul>
          <li>
            <a href='https://marketing-page-mu.now.sh/'>Home</a>
          </li>
          <li>
            <Link to='/login'>Login</Link>
          </li>
          <li>
            <Link to='/sign-up'>Sign Up</Link>
          </li>
          <li>
            <Link to='/post-input'>New Post</Link>
          </li>
          <li>
            <Link to='/logout' onClick={logout} >Log Out</Link>
          </li>
        </ul>
      </header>
      <Route path='/login'
        component={Login}
      />
      <Route path='/sign-up'
        component={NewUser}
      />
      <PrivateRoute path='/post-input'
        component={PostInput}
      />
      <PrivateRoute path='/update-post/:id'
        component={UpdatePost}
      />
    </div>
  );
}

export default App;
