import React from 'react';
import './NotFoundPage.css';
import notFound from './404.png';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';


class NotFoundPage extends React.Component{
  
    render(){
        
        return <><Navbar /> <div className='NFound'>
            <img className='img' src={notFound}  alt='not Found'/>
            <p style={{textAlign:"center"}}>
              <Link to="/">Go to Home </Link>
            </p>
          </div>;
          </>
    }
}
export default NotFoundPage