import React, { Component } from 'react';

import './header-component.css';
import Content from '../content/content-component';

export default class Header extends Component {

    render() {
        return (
            <>
                <div className="header-container">
                    <div className="header-logo"> LOGO </div>
                    <ul className="header-content">
                        <li className="header-content-item">Login</li>
                        <li className="header-content-item">User</li>
                    </ul>
                    <div className="header-logo"></div>
                </div>
                <Content />
            </>
        )
    }
}