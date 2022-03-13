import React from 'react';
import './Connexion.css'
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Navbar from '../Navbar/Navbar';


const cookies = new Cookies();

class Connexion extends React.Component {

    
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            redirection: false
        };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEmailChange(event) {
        this.setState({
            email: event.target.value
        });
    }

    handlePasswordChange(event) {
        this.setState({
            password: event.target.value
        });
    }

    handleSubmit(e) {
        let objetPost = {
            email: this.state.email,
            password: this.state.password,
        }

        e.preventDefault();

        fetch('http://localhost:5000/api/user/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objetPost)
        }).then(async (response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                return Promise.reject(await response.json());
            }
        }).then((data) => {
            cookies.set('token', data.token, { path: '/' });
            cookies.set('userId', data.userId, { path: '/' });
    
            this.setState({ redirection: true });
        }).catch(err => {
            console.log('err', err);
            alert(err.error);
            
        })
    }

    render() {
        const { redirection } = this.state;
        if (redirection) {
            return <Redirect to='/Profil' />;
        }
        return (
            <>
            <Navbar />
            <div className="bg-img">
            <form className="container" onSubmit={this.handleSubmit}>
                <h2> Log In</h2>
                <br/>
                <label htmlFor="email">Email : </label>
                <input type="email" id="email" value={this.state.value} onChange={this.handleEmailChange} />
                <label htmlFor="pass">Password : </label>
                <input type="password" id="pass" value={this.state.value} onChange={this.handlePasswordChange} />
                <input className="btn" type="submit" value="Log In" />
            </form>
            </div>
            </>
        );
    }
}

export default Connexion;