import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Content extends Component {

    render() {
        return (
            <React.Fragment >
                <div>hereISTHECONTENT</div>
                <Link to="/login"><button type="submit" className="btn btn-primary mr-4">Logout</button> </Link>
            </React.Fragment>
        )
    }
}