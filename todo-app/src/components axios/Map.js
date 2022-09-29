import '../App.css';
import PhonebookForm from "../container/PhonebookForm"
import PhonebookTable from "../container/PhonebookTable"
import React, { useState } from 'react';
import { GoogleMap, InfoWindowF, LoadScript, MarkerF } from "@react-google-maps/api";

export default function PhonebookBox() {

    const [activeInfoWindow, setActiveInfoWindow] = useState("");
    const [markers, setMarkers] = useState([{
        position: {
            lat: -6.966667,
            lng: 110.416664
        },
        label: { color: "white", text: "Label Kontak" },
        name: "Nama Kontak",
        draggable: false,
        phone: "Nomor Kontak",
        alamat: "Alamat Kontak"
    }]);

    const positionData = (data) => {
        console.log('data posisi', data.latitude)
        setActiveInfoWindow('')
        mapOn(true)
        setMarkers([{
            position: {
                lat: data.latitude,
                lng: data.longitude
            },
            label: { color: "white", text: String(data.name) },
            name: data.name,
            draggable: false,
            phone: data.phone,
            alamat: data.alamat
        }]);
    }
    const onInfoWindowClose = () => {
        setActiveInfoWindow('')
    }


    const containerStyle = {
        width: "100%",
        height: "50vh",
    }

    const center = {
        lat: markers[0].position.lat,
        lng: markers[0].position.lng,
    }

    const mapClicked = (event) => {
        console.log(event.latLng.lat(), event.latLng.lng())
        // setMarkers([{
        //     position: {
        //         lat: event.latLng.lat(),
        //         lng: event.latLng.lng(),
        //     },
        // }]);
    }

    const markerClicked = (marker, index) => {
        setActiveInfoWindow(index)
        console.log(marker, index)
    }

    const markerDragEnd = (event, index) => {

    }


    //=============================================
    const [onAdd, setOnAdd] = useState(false);
    const [name, setName] = useState("");
    const [alamat, setAlamat] = useState("");
    const [data, setData] = useState({});

    const mapOn = (value) => {
        setOnAdd(value)
    }

    const searchReset = () => {
        setData({})
        setName("")
        setAlamat("")
    }

    const enterSearch = (event) => {
        if (event.key === 'Enter') {
            let data = {}

            if (name && alamat) {
                data = {
                    name,
                    alamat
                }
            } else if (!name && !alamat) {
                data = {}
            } else if (!name) {
                data = {
                    alamat
                }
            } else if (!alamat) {
                data = {
                    name
                }
            }

            setData(data)
        }
    }

    return (
        <div className="container-box">
            <header className="card-header header-maps mb-4">
                Phone Book Apps
            </header>
            <main className="main-phonebook">
                {onAdd && <div className='col-md-12 mb-1'>
                    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
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
                                    label={marker.label}
                                    draggable={marker.draggable}
                                    onDragEnd={event => markerDragEnd(event, index)}
                                    onClick={event => markerClicked(marker, index)}
                                >
                                    {
                                        (activeInfoWindow === index)
                                        &&
                                        <InfoWindowF position={marker.position} onCloseClick={onInfoWindowClose}>
                                            <div>
                                                <h3> <b> {marker.name} </b> </h3>
                                                <p className="mb-1"> <i className="fa-solid fa-phone me-1"></i> {marker.phone} </p>
                                                <p className="mb-1">
                                                    <i className="fa-solid fa-location-dot me-1"></i>
                                                    <i> {marker.position.lat}, {marker.position.lng} </i>
                                                </p>
                                                <hr />
                                                <p> {marker.alamat} </p>
                                            </div>
                                        </InfoWindowF>
                                    }
                                </MarkerF>
                            ))}
                        </GoogleMap>
                    </LoadScript>
                </div>}
                {onAdd && <a href={`/`} className="btn btn-danger btn-add mb-5" >
                    <i className="fa-solid fa-xmark"></i>
                </a>}
                <div className="phonebook-add-container">
                    {/* {!onAdd && <button type="button" className="btn btn-primary btn-add" onClick={() => mapOn(true)}>
                        <i className="fa-solid fa-plus me-2"></i>
                        Add
                    </button>}
                    {onAdd && <PhonebookForm setOnAdd={mapOn} searchReset={searchReset} />} */}
                    <div className="card form-card">
                        <div className="card-header" style={{ "padding": "15px 20px" }}>
                            <b>Search Form</b>
                        </div>
                        <div className="card-body">
                            <label className="fw-bold">
                                Name
                                <input type="text" className="input-phonebook" value={name} onChange={(event) => setName(event.target.value)} onKeyDown={enterSearch} placeholder="Name. . . " />
                            </label>
                            <label className="fw-bold">
                                Alamat
                                <input type="text" className="input-phonebook" value={alamat} onChange={(event) => setAlamat(event.target.value)} onKeyDown={enterSearch} placeholder="Alamat. . ." />
                            </label>
                        </div>
                    </div>
                    <div>
                        <a className="btn btn-primary" href={`/add`}>
                            <i className="fa-solid fa-plus me-2"></i>
                            Add
                        </a>
                    </div>
                    <br />
                    <div>
                        <PhonebookTable
                            searchData={data}
                            searchReset={searchReset}
                            fungsi={positionData.bind(this)}
                        />
                    </div>

                </div>
            </main>
        </div>
    )
}