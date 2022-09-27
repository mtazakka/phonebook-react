import React, { Component } from 'react'
import axios from 'axios'
import ContactForm from './ContactForm'
import ContactList from './ContactList'

const request = axios.create({
    baseURL: 'http://localhost:3001/',
    // timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' }
});


export default class ContactBox extends Component {
    constructor(props) {
        super(props);
        this.state = { contacts: [] };
    }

    async componentDidMount() {
        try {
            const { data } = await request.get('contacts');
            if (data.success) {
                this.setState({
                    contacts: data.data.map(item => {
                        item.sent = true
                        return item
                    })
                })
            } else {
                alert('gagal ambil data')
            }
        } catch (error) {
            console.error(error);
        }
    }

    addContact = async (name, phone) => {
        const id = Date.now()
        this.setState((state) =>
        ({
            contacts: [
                ...state.contacts,
                { id, name, phone, sent: true }
            ]
        }))
        try {
            const { data } = await request.post('contacts', { name, phone });
            if (data.success) {
                this.setState((state) => ({
                    contacts: state.contacts.map(item => {
                        if (item.id === id) {
                            return { ...data.data, sent: true }
                        }
                        return item
                    })
                }))
            } else {
                console.log(data.data)
            }
        } catch (error) {
            console.error(error);
            this.setState((state) => ({
                contacts: state.contacts.map(item => {
                    if (item.id === id) {
                        item.sent = false
                    }
                    return item
                })
            }))
        }
    }

    removeContact = async (id) => {
        try {
            const { data } = await request.delete(`contacts/${id}`);
            if (data.success) {
                this.setState((state) => ({
                    contacts: state.contacts.filter((item) => item.id !== id)
                }))
            } else {
                alert('Contact not found')
            }
        } catch (error) {
            console.log(error)
        }
    }
    resendContact = async (id, name, phone) => {
        try {
            const { data } = await request.post('contacts', { name, phone });
            if (data.success) {
                this.setState((state) => ({
                    contacts: state.contacts.map(item => {
                        if (item.id === id) {
                            return { ...data.data, sent: true }
                        }
                        return item
                    })
                }))
            }
        } catch (error) {
            console.error(error);
        }
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