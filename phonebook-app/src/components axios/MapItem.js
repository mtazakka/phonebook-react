import '../App.css';
import React, { useState } from "react"
import { useMutation } from '@apollo/client';
// import { useNavigate } from "react-router-dom";
import { DELETE_USER, GET_USERS, UPDATE_USER } from "../utils/queries";
import { GoogleMap, InfoWindowF, LoadScript, MarkerF } from "@react-google-maps/api";
import HashLoader from "react-spinners/HashLoader";


export default function PhonebookItem(props) {

    const [deletePhonebook, { loading, error }] = useMutation(DELETE_USER, {
        refetchQueries: [
            {
                query: GET_USERS,
                //Make sure that variables are the same ones as the ones you used to get GET_USER_CART data. If it is different, it wont work. Check if your variables are the same on useQuery you called before and this query
                variables: { name: '', alamat: '', offset: 0, limit: 10 },
                awaitRefetchQueries: true,
            },
        ],
    });
    const [activeInfoWindow, setActiveInfoWindow] = useState("");
    // const navigate = useNavigate();
    const [updatePhonebook, { loading1, error1 }] = useMutation(UPDATE_USER, {
        refetchQueries: [{ query: GET_USERS }],
    });

    const [OnEdit, setOnEdit] = useState(false)
    const [user, setUser] = useState({
        name: props.name,
        phone: props.phone,
        latitude: props.latitude,
        longitude: props.longitude,
        alamat: props.alamat,
    })

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setUser({
            ...user,
            [name]: value
        });
        if (target.name === 'latitude' || 'longitude') {
            setMarkers([{
                position: {
                    lat: parseFloat(target.name === 'latitude' ? target.value : user.latitude),
                    lng: parseFloat(target.name === 'longitude' ? target.value : user.longitude),
                },
                draggable: true
            }]);
        }
    }
    const handleUpdate = () => {
        if (user.name !== "" && user.phone !== "") {
            updatePhonebook({ variables: { id: props.id, user } });
            setOnEdit(false)
            props.searchReset()
            console.log('user', user)
        }
    }

    const [markers, setMarkers] = useState([{
        position: {
            lat: user.latitude,
            lng: user.longitude
        },
        draggable: true
    }]);

    const containerStyle = {
        width: "100%",
        height: "50vh",
    }
    const center = {
        lat: user.latitude,
        lng: user.longitude,
    }

    const mapClicked = (event) => {
        console.log(event.latLng.lat(), event.latLng.lng())
        setMarkers([{
            position: {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
            },
        }]);
        setUser({
            name: user.name,
            phone: user.phone,
            latitude: event.latLng.lat(),
            longitude: event.latLng.lng(),
            alamat: user.alamat,
        })
    }

    const markerClicked = (marker, index) => {
        setActiveInfoWindow(index)
        console.log(marker, index)
    }

    const markerDragEnd = (event, index) => {
        setUser({
            name: user.name,
            phone: user.phone,
            latitude: event.latLng.lat(),
            longitude: event.latLng.lng(),
            alamat: user.alamat,
        })
    }
    if (loading) return <p className="loading">
        <HashLoader size={150} />
    </p>;
    if (error) return `Submission error! ${error.message}`;
    if (loading1) return <p className="loading">
        <HashLoader size={150} />
    </p>;
    if (error1) return `Submission error! ${error.message}`;

    if (OnEdit) {
        return (
            <div className="row g-3">
                <div className="col-md-8 mb-4">
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
                                    draggable={marker.draggable}
                                    onDragEnd={event => markerDragEnd(event, index)}
                                    onClick={event => markerClicked(marker, index)}
                                >
                                    {
                                        (activeInfoWindow === index)
                                        &&
                                        <InfoWindowF position={marker.position}>
                                            <div>
                                                <h3> <b> {user.name} </b> </h3>
                                                <p className="mb-1"> <i className="fa-solid fa-phone me-1"></i> {user.phone} </p>
                                                <p className="mb-1">
                                                    <i className="fa-solid fa-location-dot me-1"></i>
                                                    <i> {marker.position.lat}, {marker.position.lng} </i>
                                                </p>
                                                <hr />
                                                <p> {user.alamat} </p>

                                            </div>
                                        </InfoWindowF>
                                    }
                                </MarkerF>
                            ))}
                        </GoogleMap>
                    </LoadScript>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="mb-3" scope="row" style={{ "lineHeight": "35px" }}>{props.index + 1}</div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label mb-0"><b>Name</b></label>
                        <input type="text" className="input-phonebook input-edit-phonebook" name="name" value={user.name} onChange={handleInputChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label mb-0"><b>Phone</b></label>
                        <input type="number" step="any" className="input-phonebook input-edit-phonebook" name="phone" value={user.phone} onChange={handleInputChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="alamat" className="form-label mb-0"><b>Alamat</b></label>
                        <input type="text" className="input-phonebook input-edit-phonebook" name="alamat" value={user.alamat} onChange={handleInputChange} />
                    </div>
                    <div className="row g-1 mb-3">
                        <label htmlFor="latitude-longitude" className="form-label mb-0"><b>Latitude & Longitude</b></label>
                        <div className="col-md-6">
                            <input type="number" step="any" className="input-phonebook input-edit-phonebook" name="latitude" value={user.latitude} onChange={handleInputChange} />
                        </div>
                        <div className="col-md-6">
                            <input type="number" step="any" className="input-phonebook input-edit-phonebook" name="longitude" value={user.longitude} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="btn btn-primary" onClick={handleUpdate}>
                            <i className="far fa-check-circle me-2"></i>
                            Save
                        </button>
                        <a href={`/`} className="btn btn-warning me-2" style={{ "color": "white" }} >
                            <i className="fas fa-ban me-2"></i>
                            Cancel
                        </a>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="row">
                <div className="col-md-1 mb-1">{props.index + 1}</div>
                <div className="col mb-1" onClick={() => props.fungsi2(user)} style={{ "lineHeight": "35px" }}>{props.name}</div>
                <div className="col mb-1" style={{ "lineHeight": "35px" }}>{props.phone}</div>
                <div className="col mb-1" style={{ "lineHeight": "35px" }}>{props.alamat}</div>
                <div className="col mb-1">
                    <button type="submit" className="btn btn-success me-2" onClick={() => { setOnEdit(true) }}>
                        <i className="fas fa-pen me-2"></i>
                        Edit
                    </button>
                    <button type="submit" className="btn btn-danger" onClick={() => deletePhonebook({ variables: { id: props.id } })}>
                        <i className="fas fa-trash-alt me-2"></i>
                        Delete
                    </button>
                </div>
                <hr style={{ "height": "5px" }} className="mb-1"></hr>
            </div>
        )
    }
}