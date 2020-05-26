import React from 'react';
import { Route, Link } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';

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
        <Route path='/auth/login' 
          // component={Login}
        />
      </div>
  );
}

export default App;
