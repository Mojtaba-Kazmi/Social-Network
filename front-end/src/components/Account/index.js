import React from 'react';
import {useState} from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

const Index = (props) => {

    const [signUpModel, setSignUpModel] = useState(props.signup);
    const [signInModel, setSignInModel] = useState(props.signin);

    const handleModels = (e) => {

        if(e.target.id === "signup") {

            setSignInModel(false);
            setSignUpModel(true);

        } else if (e.target.id === "login" ) {

            setSignInModel(true);
            setSignUpModel(false);

        }

    }

    return (
        <div className='connection-form'>
            <div className='form-container'>
                <ul>
                    <img src='./img/groupomania_logo.png' width = '200px' alt='groupomania-logo'/>
                    <li onClick={handleModels} id="signup" className={signUpModel? "active-btn" : null}>sign up</li>
                    <li onClick={handleModels} id="login" className={signInModel? "active-btn" : null}> sign in</li>
                </ul>
                {signUpModel && <SignUpForm />}
                {signInModel && <SignInForm />}
            </div> 
        </div>
    );
};

export default Index;