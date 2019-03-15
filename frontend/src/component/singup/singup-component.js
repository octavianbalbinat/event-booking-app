import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './singup-component.css';

export default class Singup extends Component {
    constructor(props) {
        super(props);

        this.emailEl = React.createRef();
        this.passwordEl = React.createRef();
    }

    loginSubmitHandler = (event) => {
        event.preventDefault();
        const email = this.emailEl.current.value;
        const password = this.passwordEl.current.value;

        if (email.trim() === 0 || password.trim() === 0) {
            return;
        }

        console.log("this is the email: ", email)
        console.log("this is the password: ", password)

        const requestBody = {
            query: `
                mutation {
                    createUser(userInput: {email: "${email}", password: "${password}"}) {
                        _id
                        email
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
                console.log(resData)
            })
            .catch(err => {
                console.log(err);
            });
    };


    render() {
        return (
            <div className="singup-container">
                <form action="submit" className="singup-form" onSubmit={this.loginSubmitHandler}>
                    <h3>Create account</h3>
                    <div className="form-group">
                        <label htmlFor="singup-email">User email:</label>
                        <input id="singup-email" type="email" placeholder="Enter email" ref={this.emailEl} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="singup-password">User password:</label>
                        <input id="singup-password" type="password" placeholder="Enter password" ref={this.passwordEl} />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary mr-4">Submit</button>
                        <Link className="singup-link-btn" to="/login"><button className="btn btn-secondary">Go to login</button></Link>
                    </div>
                </form>
            </div>
        )

    }
}
