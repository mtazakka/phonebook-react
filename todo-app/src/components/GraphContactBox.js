import React, { useState } from 'react'
import ContactForm from './GraphContactForm'
import ContactList from './GraphContactList'
import { graphqlClient } from '../utils/api'
import { ApolloProvider } from '@apollo/client';

export default function ContactBox(props) {


    // const [onAdd, setOnAdd] = useState(false);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [data, setData] = useState({});

    // const mapOn = (value) => {
    //     setOnAdd(value)
    // }

    const searchReset = () => {
        setData({})
        setName("")
        setPhone("")
    }

    const enterSearch = (event) => {
        if (event.key === 'Enter') {
            let data = {}
            if (name && phone) {
                data = {
                    name,
                    phone
                }
            } else if (!name && !phone) {
                data = {}
            } else if (!name) {
                data = {
                    phone
                }
            } else if (!phone) {
                data = {
                    name
                }
            }
            setData(data)
        }
    }
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
                        <label className="fw-bold">
                            Name
                            <input type="text" value={name} onChange={(event) => setName(event.target.value)} onKeyDown={enterSearch} placeholder="Name. . . " />
                        </label>
                        <label className="fw-bold">
                            Phone
                            <input type="text" value={phone} onChange={(event) => setPhone(event.target.value)} onKeyDown={enterSearch} placeholder="Alamat. . ." />
                        </label>
                    </div>
                    <hr />
                    <ContactList
                        searchData={data}
                        searchReset={searchReset}
                    />
                </div>
            </div>
        </ApolloProvider>
    )
}
