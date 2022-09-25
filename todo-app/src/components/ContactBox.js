import React, { Component } from 'react'
import ContactForm from './ContactForm'
import ContactList from './ContactList'

export default class ContactBox extends Component {
    constructor(props) {
        super(props);
        this.state = { contacts: [] };
    }

    componentDidMount() {
        fetch('http://example.com/movies.json').then((response) => response.json())
            .then((data) => console.log(data));

    }

    addContact = (title) => {
        this.setState((state) => ({
            contacts: [
                ...state.contacts,
                { id: Date.now(), title }
            ]
        }))
    }

    render() {
        return (
            <div className='container'>
                <div className='card' >
                    <div className='card-header' >
                        <h1>Phone Book Apps</h1>
                    </div>
                    <div className='card-body' >
                        <ContactForm add={this.addContact} />
                    </div>
                    <div className='card-header' id="searchform">
                        <h6>Search Form</h6>
                    </div>
                    <div className='card-body' >

                    </div>
                    <hr />
                    <ContactList data={this.state.contacts} />
                </div>
            </div>
        )
    }
}