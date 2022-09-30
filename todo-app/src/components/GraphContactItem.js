import React, { useState } from "react"
import { useMutation } from '@apollo/client';
import { DELETE_CONTACT, GET_CONTACTS, UPDATE_CONTACT } from "../utils/queries";
import '../App.css';

export default function ContactItem(props) {

    const [deleteContact, { data, loading, error }] = useMutation(DELETE_CONTACT, {
        refetchQueries: [{
            query: GET_CONTACTS,
            variables: { name: '', alamat: '', offset: 0, limit: 10 },
            awaitRefetchQueries: true,
        }],
    });

    const [updateContact] = useMutation(UPDATE_CONTACT, {
        refetchQueries: [{ query: GET_CONTACTS }],
    });

    const [isEdit, setIsEdit] = useState(false)
    const [contact, setContact] = useState({
        name: props.contact.name,
        phone: props.contact.phone,
    })

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setContact({
            ...contact,
            [name]: value
        });
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
    };

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;

    if (isEdit) {
        return (
            <tr>
                <td>{props.no}</td>
                <td>
                    <input name="name" type="text" value={contact.name} onChange={handleInputChange} />
                </td>
                <td>
                    <input name="phone" type="text" value={contact.phone} onChange={handleInputChange} />
                </td>
                <td>
                    <button className="btn btn-primary" type="button"
                        onClick={handleUpdate}>
                        SAVE
                    </button>
                    <button className="btn btn-warning" type="button"
                        onClick={() => setIsEdit(false)}>
                        CANCEL
                    </button>
                </td>
            </tr>
        )
    } else {
        return (
            <div className="card-body">
                <div className="row" id="container-item">
                    <div className="col-md-1">{props.no}</div>
                    {/* <div className="col mb-1" onClick={() => props.fungsi2(user)} style={{ "lineHeight": "35px" }}>{props.name}</div> */}
                    <div className="col-md-4" >{contact.name}</div>
                    <div className="col-md-4" >{contact.phone}</div>
                    <div className="col-md-3" id="container-button">
                        <button type="submit" className="btn btn-success" onClick={() => { setIsEdit(true) }}>
                            Edit
                        </button>
                        <button type="submit" className="btn btn-danger" style={{ "marginLeft": "5px" }} onClick={() => deleteContact({ variables: { id: props.contact.id } })}>
                            Delete
                        </button>
                    </div>
                </div >
            </div >
            // <tr>
            //     <td>{props.no}</td>
            //     <td>
            //         {props.contact.name}
            //     </td>
            //     <td>
            //         {props.contact.phone}
            //     </td>
            //     <td>
            //         <button className="btn btn-success" type="button"
            //             onClick={() => setIsEdit(true)}>
            //             EDIT
            //         </button>
            //         <button className="btn btn-danger" type="button"
            //             onClick={() => deleteContact({ variables: { id: props.contact.id } })}>
            //             DELETE
            //         </button>
            //         {/* <button className={props.contact.sent ? "btn btn-danger" : "btn btn-warning"} type="button"
            //             onClick={props.contact.sent ? props.remove : props.resend}>
            //             {props.contact.sent ? "DELETE" : "RESEND"}
            //         </button> */}
            //     </td>
            // </tr>
        )
    }
}
