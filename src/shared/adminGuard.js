import React from 'react';
import { Route, Redirect } from "react-router-dom";
import Error from './assets/components/error';

const AdminGuard = ({ component: Component, hasPermission, ...rest }) => (
    <Route {...rest} render={(props) => (
        isEmpty(hasPermission)
            ? <Error severity='error'>you don't have the permission to access this page</Error>
            : <Component {...props} />

    )} />
)

function isEmpty(e) {
    switch (e) {
        case "":
        case 0:
        case "0":
        case 'null':
        case null:
        case false:
        case 'undefined':
        case typeof (e) == "undefined":
            return true;
        default:
            return false;
    }
}


export default AdminGuard;