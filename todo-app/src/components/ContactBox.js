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
                this.setState({
                    contacts: data.map(item => {
                        item.sent = true
                        return item
                    })
                })
            });
    }


    addContact = (name, phone) => {
        const id = Date.now();
        this.setState((state) => ({ contacts: [...state.contacts, { id, name, phone }] }))
        fetch('http://localhost:3000/phonebooks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, name, phone })
        }).then((response) => response.json())
            .then((data) => {
                // this.setState({ contacts: data })
            }).catch((e) => {
                this.setState((state) => ({
                    contacts: state.contacts.map((item) => {
                        if (item.id == id) {
                            item.sent = false
                        }
                        return item
                    })
                }))
            })
    }
    removeContact = (id) => {
        fetch(`http://localhost:3000/phonebooks/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json()).then((data) => {
            this.setState((state) => ({ contacts: state.contacts.filter((item) => item.id !== id) }))
        });
    }
    resendContact = (id, name, phone) => {
        fetch(`http://localhost:3000/phonebooks/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, name, phone })
        }).then((response) => response.json()).then((data) => {
            this.setState((state) => ({
                contacts: state.contacts.map((item) => {
                    if (item.id == id) {
                        item.sent = true
                    }
                    return item
                })
            }))
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
                    <ContactList data={this.state.contacts} remove={this.removeContact} resend={this.resendContact} />
                </div>
            </div>
        )
    }
}