import React from 'react';
import './Inscription.css'
import { Redirect } from 'react-router-dom'
import Navbar from '../Navbar/Navbar';

class Inscription extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            firstName: '',
            email: '',
            password: '',
            redirection: false,
            selectedFile: null
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
    }

    resetForm() {
        this.setState({
            name: '',
            firstName: '',
            email: '',
            password: '',
            redirection: false,
            selectedFile: null
        });
    }

    handleNameChange(event) {
        this.setState({
            name: event.target.value
        });
    }

    handleFirstNameChange(event) {
        this.setState({
            firstName: event.target.value
        });
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
    handleFileChange = event => {
        this.setState({
            selectedFile: event.target.files[0],
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const data = new FormData()

        if (this.state.selectedFile != null) {
            data.append('file', this.state.selectedFile)
        }

        data.append('name', this.state.name)
        data.append('firstName', this.state.firstName)
        data.append('email', this.state.email)
        data.append('password', this.state.password)

        fetch('http://localhost:5000/api/user/signup', {
            method: 'POST',
            headers: {
            },
            body: data
        }).then(async (response) => {
            if (response.status === 200) {
                this.setState({ redirection: true });
            } else {
                return Promise.reject(await response.json());
            }
        }).catch(err => {
            console.log('err', err);
            alert(err.error);
            this.resetForm();
        })
    }

    render() {
        const { redirection } = this.state;
        if (redirection) {
            return <Redirect to='/Connexion' />
        }
        return (
                <>
                <Navbar />
                <div className="bg-img">
                <form className='container' onSubmit={this.handleSubmit}>
                     <h2> Register</h2>
                     <br/>
                     <label htmlFor="nom">Last Name*   </label>
                     <input type="text" id="nom" value={this.state.name} onChange={this.handleNameChange} placeholder="Alex"/>
                     <label htmlFor="prenom">First Name*   </label>
                     <input type="text" id="prenom" value={this.state.firstName} onChange={this.handleFirstNameChange} placeholder="Clement" />
                     <label htmlFor="email">Email*   </label>
                     <input type="email" id="email" value={this.state.email} onChange={this.handleEmailChange} placeholder="alex.clement@mail.com"/>
                     <label htmlFor="password">Password*  </label>
                     <input type="password" id="password" value={this.state.password} onChange={this.handlePasswordChange} placeholder="between 4 and 8 caracters, 1 capital, 1 lowercase , 1 number"/>
                     <label htmlFor="avatar">Profile Photo** </label>
                     <input type="file" id="avatar" accept="image/png, image/jpeg" onChange={this.handleFileChange}/>
                     <br/>
                     <br/>
                     <p>*Required Field</p>
                     <br/>
                     <p>**File Accepted : .jpeg, .jpg, gif et .png</p>
                     <br/>
                    <input className="btn" type="submit" value="Register" />
                </form>
                </div>
             </>
        );
    }
}

export default Inscription;