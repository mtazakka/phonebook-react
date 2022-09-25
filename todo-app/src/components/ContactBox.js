import React, { Component } from 'react'
import ContactForm from './ContactForm'
import ContactList from './ContactList'

export default class ContactBox extends Component {
    constructor(props) {
        super(props);
        this.state = { contacts: [] };
    }

    componentDidMount() {
        fetch('http://localhost:3000/phonebooks').then((response) => response.json())
            .then((data) => {
                this.setState({ contacts: data })
            });
    }


    addContact = (name, phone) => {
        this.setState((state) => ({ contacts: [...state.contacts, { id: Date.now(), name, phone }] }))
        fetch('http://localhost:3000/phonebooks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, phone })
        }).then((response) => response.json())
            .then((data) => {
                // this.setState({ contacts: data })
            });
    }
    removeContact = (id) => {
        this.setState((state) => state.data.filter((item, index) => index !== id))
        fetch(`http://localhost:3000/phonebooks/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json()).then((data) => {
            // this.setState({ contacts: data })
        });
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
                    <ContactList data={this.state.contacts} remove={this.removeContact} />
                </div>
            </div>
        )
    }
}