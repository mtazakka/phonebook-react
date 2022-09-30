import React, { useState } from 'react'
import { useMutation } from '@apollo/client';
import { GET_CONTACTS, CREATE_CONTACT } from '../utils/queries';
import { GoogleMap, InfoWindowF, LoadScript, MarkerF } from "@react-google-maps/api";

export default function ContactForm() {
  const [createContact, { data, loading, error }] = useMutation(CREATE_CONTACT, {
    refetchQueries: [{ query: GET_CONTACTS }],
  });

  const [contact, setContact] = useState({
    name: '',
    phone: '',
    address: '',
    lat: '',
    lng: ''
  })

  const [markers, setMarkers] = useState([{
    position: {
      lat: -6.923838759921482,
      lng: 107.68879294395448
    },
    draggable: true
  }]);

  const [activeInfoWindow, setActiveInfoWindow] = useState("");
  const containerStyle = {
    width: "100%",
    height: "50vh",
  }

  const center = {
    lat: markers[0].position.lat,
    lng: markers[0].position.lng,
  }

  const markerDragEnd = (event, index) => {
    setContact({
      name: contact.name,
      phone: contact.phone,
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      address: contact.address,
    })
  }

  const mapClicked = (event) => {
    console.log(event.latLng.lat(), event.latLng.lng())
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
      address: contact.address,
    })
  }

  const markerClicked = (marker, index) => {
    setActiveInfoWindow(index)
    console.log(marker, index)
  }

  const handleChange = (event) => {
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
          lat: parseFloat(target.name === 'lat' ? target.value : markers[0].position.lat),
          lng: parseFloat(target.name === 'lng' ? target.value : markers[0].position.lng),
        },
        draggable: true
      }]);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    createContact({ variables: { contact } });
    alert("New Contact has been Add!")
    setContact({
      name: '',
      phone: '',
      address: '',
      lat: '',
      lng: ''
    })
  }

  const handleAlert = (event) => { }

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className='col-md-7'>
            <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={5}
                onClick={mapClicked}
              >
                {markers.map((marker, index) => (
                  <MarkerF
                    key={index}
                    position={marker.position}
                    draggable={marker.draggable}
                    onDragEnd={event => markerDragEnd(event, index)}
                    onClick={event => markerClicked(marker, index)}
                  >
                  </MarkerF>
                ))}
              </GoogleMap>
            </LoadScript>
          </div>
          <div className="col-md-5">
            <div className="row mb-3">
              <label htmlFor="name" className="form-label">
                <input name='name' type="text" className="form-control" id="name" value={contact.name} onChange={handleChange} placeholder="Name. . . " required />
              </label>
            </div>
            <div className="row mb-3">
              <label htmlFor="phone" className="form-label">
                <input name="phone" type="number" className="form-control" id="phone" value={contact.phone} onChange={handleChange} placeholder="Phonenumber. . . " required />
              </label>
            </div>
            <div className="row mb-3">
              <label htmlFor="address" className="form-label">
                <input name="address" type="text" className="form-control" id="address" value={contact.address} onChange={handleChange} placeholder="Address. . . " required />
              </label>
            </div>
            <div className="row mb-3">
              <label htmlFor="lat" className="form-label">
                <input type="number" className="form-control" id="lat" name="lat" value={contact.lat} onChange={handleChange} placeholder="Click / Drag on Map" readOnly />
              </label>
            </div>
            <div className="row mb-3">
              <label htmlFor="address" className="form-label">
                <input type="number" className="form-control" id="lng" name="lng" value={contact.lng} onChange={handleChange} placeholder="Click / Drag on Map" readOnly />
              </label>
            </div>
            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" aria-label="Close"> Add </button>
          </div>
        </div>
      </form >

    </div >
  );
}
