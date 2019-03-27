import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LoginContext from '../context/login-context';

import './login-component.css';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.emailEl = React.createRef();
        this.passwordEl = React.createRef();
    }

    static contextType = LoginContext;

    loginSubmitHandler = (event) => {
        event.preventDefault();
        const email = this.emailEl.current.value;
        const password = this.passwordEl.current.value;

        if (email.trim() === 0 || password.trim() === 0) {
            return;
        }

        console.log("this is the email: ", email)
        console.log("this is the password: ", password)

        let requestBody = {
            query: `
                query {
                    login(email: "${email}", password: "${password}") {
                        userId
                        token
                        tokenExpiration
                    }
                }
            `
        }

        fetch('http://localhost:5000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('Failed!');
                }
                return res.json();
            })
            .then(resData => {
                if (resData.data.login.token) {
                    this.context.login(resData.data.login.token, resData.data.login.userId, resData.data.login.tokenExpiration)
                }
            })
            .catch(err => {
                console.log(err);
            });
    };


    render() {
        return (
            <div className="login-container">
                <form action="submit" className="login-form" onSubmit={this.loginSubmitHandler}>
                    <h3>Login</h3>
                    <div className="form-group">
                        <label htmlFor="login-email">User email:</label>
                        <input id="login-email" type="email" placeholder="Enter email" ref={this.emailEl} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="login-password">User password:</label>
                        <input id="login-password" type="password" placeholder="Enter password" ref={this.passwordEl} />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary mr-4">Login</button>
                        <Link className="login-link-btn" to="/singup"><button className="btn btn-secondary">Go to singup</button></Link>
                    </div>
                </form>
            </div>
        )

    }
}
