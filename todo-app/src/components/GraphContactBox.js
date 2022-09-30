import React, { useState } from 'react'
import ContactForm from './GraphContactForm'
import ContactList from './GraphContactList'
import { graphqlClient } from '../utils/api'
import { ApolloProvider } from '@apollo/client';
import { GoogleMap, InfoWindowF, LoadScript, MarkerF } from "@react-google-maps/api";

export default function ContactBox(props) {
    const { isLoaded } = new LoadScript({
        GoogleMapApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    });

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [data, setData] = useState({});

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
                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" id="button-add" >
                            New Contact
                        </button>
                        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div className="modal-dialog modal-xl">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="staticBackdropLabel">New Contact Form</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        < ContactForm />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='card-header' style={{ "textAlign": "center" }}>
                        <h5>Search Form</h5>
                    </div>
                    <div className='card-body' >
                        <div className="row mb-3" style={{ "textAlign": "center" }}>
                            <label className="col-md-6">
                                <input type="text" className="form-control" value={name} onChange={(event) => setName(event.target.value)} onKeyDown={enterSearch} placeholder="Name. . . " />
                            </label>
                            <label className="col-md-6">
                                <input type="text" className="form-control" value={phone} onChange={(event) => setPhone(event.target.value)} onKeyDown={enterSearch} placeholder="Alamat. . ." />
                            </label>
                        </div>
                    </div>
                    <div className='card-header' style={{ "textAlign": "center" }}>
                        <h5>Contact List</h5>
                    </div>
                    <ContactList
                        searchData={data}
                        searchReset={searchReset}
                    />
                </div>
            </div>
        </ApolloProvider>
    )
}
