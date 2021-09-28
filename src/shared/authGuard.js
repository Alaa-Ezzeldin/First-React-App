import React from 'react';
import { Route, Redirect } from "react-router-dom";

const AuthGuard = ({ component: Component, hasPermission }) => (
    <Route render={(props) => (
        hasPermission
            ? <Component {...props} />
            : <Redirect to='/login' />
    )} />
)

export default AuthGuard;