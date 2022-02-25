import React, { useContext } from 'react';
import Account from '../components/Account';
import { UidContext } from "../components/AppContext";

const Profil = () => {

    const uid = useContext(UidContext);

    return (
        <div className='profil-page'>
            {uid ? (
                <h1> Update Profile </h1>
             ) : (
            <div className='log-container'>
                <Account signup = {true} signin = {false} />
                <div className='img-container'>
                    <img src='./img/account.png' alt='account-img'/>
                </div>
            </div>
            )}
        </div>
    );
};

export default Profil;