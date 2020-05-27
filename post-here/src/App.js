import React from 'react';
import { Route, Link } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import PostInput from './components/PostInput';
import Login from './components/Login';
import NewUser from './components/NewUser';

import './App.css';


function App() {
  return (
    <div className="App">
      <header>
      <div className="logo">
      <img src="https://cdn0.iconfinder.com/data/icons/application-12/50/Reddit-512.png" alt="Reddit Logo"/>
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
    </div>
  );
}

export default App;
