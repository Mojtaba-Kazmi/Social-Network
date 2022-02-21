import React from 'react';
import Account from '../components/Account';

const Profil = () => {
    return (
        <div className='profil-page'>
            <div className='log-container'>
                <Account signup = {true} signin = {false} />
                <div className='img-container'>
                    <img src='./img/account.png' alt='account-img'/>
                </div>
            </div>
        </div>
    );
};

export default Profil;