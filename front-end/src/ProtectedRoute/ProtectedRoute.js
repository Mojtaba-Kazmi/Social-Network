import React from 'react'
import { Redirect } from 'react-router-dom'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class ProtectedRoute extends React.Component {

    render() {

        const Component = this.props.component;
        const isAuthenticated = cookies.get('token');
       
        return isAuthenticated ? (
            <Component />
        ) : (
            <Redirect to={{ pathname: '/' }} />
        );
    }
}

export default ProtectedRoute;

