import React from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import Trending from '../../pages/Trending';


const index = () => {
    return (

        <Router>
            <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='profil' element={<Profil />}/>
                <Route path='trending' element={<Trending />}/>
                <Route path ='*' />
            </Routes>
        </Router>
    );
};

export default index;