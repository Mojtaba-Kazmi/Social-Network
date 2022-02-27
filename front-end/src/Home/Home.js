import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import './Home.css'

class Home extends Component {
    render() {
        return (
            <div className="Body">
                <h1> Groupomania Social Network</h1>
                <Link className='Home-button' to={'/Inscription'}>Sign up</Link>
                <Link className='Home-button' to={'/Connexion'}>Sign in</Link>
            </div>
        );
    }
}

export default Home;