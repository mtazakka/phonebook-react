import React from 'react'
import ContactForm from './GraphContactForm'
import ContactList from './GraphContactList'
import { graphqlClient } from '../utils/api'
import { ApolloProvider } from '@apollo/client';

export default function ContactBox(props) {

    return (
        <ApolloProvider client={graphqlClient}>
            <div className='container'>
                <div className='card' >
                    <div className='card-header' >
                        <h1>Phone Book Apps</h1>
                    </div>
                    <div className='card-body' >
                        <ContactForm />
                    </div>
                    <div className='card-header' id="searchform">
                        <h6>Search Form</h6>
                    </div>
                    <div className='card-body' >

                    </div>
                    <hr />
                    <ContactList />
                </div>
            </div>
        </ApolloProvider>
    )
}
