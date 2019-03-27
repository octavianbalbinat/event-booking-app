import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Content extends Component {
    constructor(props) {
        super(props);

        this.state = {
            events: []
        }

        this.titleRef = React.createRef();
        this.descriptionRef = React.createRef();
        this.priceRef = React.createRef();
        this.dateRef = React.createRef();
    }

    componentDidMount() {
        this.fetchEvents()
    }

    handleCreateEvent = event => {
        event.preventDefault();


    }

    fetchEvents() {
        const requestBody = {
            query: `
            query {
                events {
                  title
                  description
                  date
                  price
                  _id
                  creator {
                    _id
                    email
                  }
                }
              }          
            `
        }

        fetch('http://localhost:5000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('FAILED TO FETCH EVENTS!');
                }
                return res.json();
            })
            .then(resData => {
                const events = resData.data.events;
                this.setState({ events: events })
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        console.log(this.state.events)
        return (
            <React.Fragment >
                <div>hereISTHECONTENT</div>
                <label htmlFor="event-title">Title:</label>
                <input type="text" id="event-title" ref={this.titleRef} />
                <label htmlFor="event-description">Description:</label>
                <input type="text" id="event-description" ref={this.descriptionRef} />
                <label htmlFor="event-price">Price:</label>
                <input type="text" id="event-price" ref={this.priceRef} />
                <label htmlFor="event-date">Date:</label>
                <input type="text" id="event-date" ref={this.dateRef} />
            </React.Fragment>
        )
    }
}