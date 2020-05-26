import React from 'react';
import { Route, Link } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import NewUser from './components/NewUser';

import './App.css';


function App() {
  return (
    <div className="App">
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
        <li>
          <Link to='/sign-up'>Sign Up</Link>
        </li>
      </ul>
      <Route path='/'
      // component={LandingPage}
      />
      <Route path='/login'
        component={Login}
      />
      <Route path='/sign-up'
        component={NewUser}
      />
      <PrivateRoute path='/post-input'
        // component={PostInput}
      />
    </div>
  );
}

export default App;
