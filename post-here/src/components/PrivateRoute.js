import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props =>
                localStorage.getItem('token') ? (
                    // render component
                    <Component {...props} />
                ) : (
                    // redirect to login
                    <Redirect to='/login' />
                )
            }
        />
    )
}

export default PrivateRoute;