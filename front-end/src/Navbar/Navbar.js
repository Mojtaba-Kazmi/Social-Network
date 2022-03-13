import logo from '../logoGroupomania.png';
import { Link } from 'react-router-dom';

import React from 'react'

export default function Navbar() {
  return (
    <div className="header">
    <Link to={'/'}><img src={logo} className="logo" alt="logo" /></Link>
    <div className="header-right">
    <Link className='active' to={'/Inscription'} >Register</Link>
    <Link className='active' to={'/Connexion'} >Log In</Link>
    </div>
    </div>
  )
}
