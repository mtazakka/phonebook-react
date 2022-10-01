import React, { useState } from "react"
import { useMutation } from '@apollo/client';
import { DELETE_CONTACT, GET_CONTACTS, UPDATE_CONTACT } from "../utils/queries";
import '../App.css';
import { GoogleMap, InfoWindowF, MarkerF } from "@react-google-maps/api";

export default function ContactItem(props) {

    const [deleteContact, { loading, error }] = useMutation(DELETE_CONTACT, {
        refetchQueries: [
            {
                query: GET_CONTACTS,
                variables: { name: '', phone: '', offset: 0, limit: 9 }
            },
        ],
    });

    const [updateContact] = useMutation(UPDATE_CONTACT, {
        refetchQueries: [{ query: GET_CONTACTS }],
    });

    const [isEdit, setIsEdit] = useState(false)
    const [contact, setContact] = useState({
        name: props.contact.name,
        phone: props.contact.phone,
        address: props.contact.address,
        lat: props.contact.lat,
        lng: props.contact.lng

    })

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setContact({
            ...contact,
            [name]: value
        });
        if (target.name === 'lat' || 'lng') {
            setMarkers([{
                position: {
                    lat: parseFloat(target.name === 'lat' ? target.value : contact.lat),
                    lng: parseFloat(target.name === 'lng' ? target.value : contact.lng),
                },
                draggable: true
            }]);
        }
    }

    const handleUpdate = (event) => {
        event.preventDefault();
        updateContact({
            variables: {
                id: props.contact.id,
                contact
            }
        })
        setIsEdit(false)
        // props.searchReset()
    };

    const [markers, setMarkers] = useState([{
        position: {
            lat: contact.lat,
            lng: contact.lng
        },
        draggable: true
    }]);

    const containerStyle = {
        width: "100%",
        height: "50vh",
    }
    const center = {
        lat: contact.lat,
        lng: contact.lng,
    }

    const mapClicked = (event) => {
        setMarkers([{
            position: {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
            },
        }]);
        setContact({
            name: contact.name,
            phone: contact.phone,
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
            address: contact.address
        })
    }

    const markerClicked = (marker, index) => {
    }

    const markerDragEnd = (event, index) => {
        setContact({
            name: contact.name,
            phone: contact.phone,
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
            address: contact.address
        })
    }

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;

    if (isEdit) {
        return (
            <form onSubmit={handleUpdate}>
                <div className="row">
                    <div className='col-md-7'>
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={center}
                            zoom={15}
                            onClick={mapClicked}
                        >
                            {markers.map((marker, index) => (
                                <MarkerF
                                    key={index}
                                    position={marker.position}
                                    draggable={marker.draggable}
                                    onDragEnd={event => markerDragEnd(event, index)}
                                    onClick={marker => markerClicked(marker, index)}
                                >
                                </MarkerF>
                            ))}
                        </GoogleMap>
                    </div>

                    <div className="col-md-5">
                        <div className="row mb-3">
                            <label htmlFor="name" className="form-label">
                                <input name='name' type="text" className="form-control" id="name" value={contact.name} onChange={handleInputChange} placeholder="Name. . . " required />
                            </label>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="phone" className="form-label">
                                <input name="phone" type="number" className="form-control" id="phone" value={contact.phone} onChange={handleInputChange} placeholder="Phonenumber. . . " required />
                            </label>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="address" className="form-label">
                                <input name="address" type="text" className="form-control" id="address" value={contact.address} onChange={handleInputChange} placeholder="Address. . . " required />
                            </label>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="lat" className="form-label">
                                <input type="number" className="form-control" id="lat" name="lat" value={contact.lat} onChange={handleInputChange} placeholder="Click / Drag on Map" readOnly />
                            </label>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="address" className="form-label">
                                <input type="number" className="form-control" id="lng" name="lng" value={contact.lng} onChange={handleInputChange} placeholder="Click / Drag on Map" readOnly />
                            </label>
                        </div>
                        <div className="btn-group">
                            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" aria-label="Close"> Submit </button>
                            <button className="btn btn-warning" type="button" style={{ "marginLeft": "5px" }}
                                onClick={() => setIsEdit(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>

                </div >
            </form>
        )
    } else {
        return (
            <div className="card-body">
                <div className="row" id="container-item">
                    <div className="col-md-1">{props.no}</div>
                    <div className="col-md-4" >{contact.name}</div>
                    <div className="col-md-4" >{contact.phone}</div>
                    <div className="col-md-3" id="container-button">
                        <button type="submit" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#mapModal">
                            <i className="fa-solid fa-map"></i>
                        </button>
                        <button type="submit" className="btn btn-success" style={{ "marginLeft": "5px" }} onClick={() => { setIsEdit(true) }}>
                            Edit
                        </button>
                        <button type="submit" className="btn btn-danger" style={{ "marginLeft": "5px" }} onClick={() => deleteContact({ variables: { id: props.contact.id } })}>
                            Delete
                        </button>
                    </div>
                    <div className="modal fade" id="mapModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="mapModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="staticBackdropLabel">Location</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <GoogleMap
                                        mapContainerStyle={containerStyle}
                                        center={center}
                                        zoom={15}
                                    >
                                        {markers.map((marker, index) => (
                                            <MarkerF
                                                key={index}
                                                position={marker.position}
                                                draggable={false}
                                            >
                                                <InfoWindowF position={marker.position}>
                                                    <div>
                                                        <h3> <b> {contact.name} </b> </h3>
                                                        <p className="mb-1"> <i className="fa-solid fa-phone me-1"></i> {contact.phone} </p>
                                                        <p className="mb-1">
                                                            <i className="fa-solid fa-location-dot me-1"></i>
                                                            <i> {marker.position.lat}, {marker.position.lng} </i>
                                                        </p>
                                                        <hr />
                                                        <p> {contact.address} </p>
                                                    </div>
                                                </InfoWindowF>
                                            </MarkerF>
                                        ))}
                                    </GoogleMap>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        )
    }
}
