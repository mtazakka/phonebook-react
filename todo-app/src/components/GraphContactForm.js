import React, { useState } from 'react'
import { useMutation } from '@apollo/client';
import { GET_CONTACTS, CREATE_CONTACT } from '../utils/queries';


export default function ContactForm() {
  const [createContact, { data, loading, error }] = useMutation(CREATE_CONTACT, {
    refetchQueries: [{ query: GET_CONTACTS }],
  });

  console.log("hasil refetch", data)

  const [contact, setContact] = useState({
    name: '',
    phone: '',
  })

  const handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setContact({
      ...contact,
      [name]: value
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    createContact({ variables: { contact } });
    setContact({
      name: '',
      phone: '',
    })
  }

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
          <div className="col-sm-10">
            <input name='name' type="text" className="form-control" id="name" value={contact.name} onChange={handleChange} required />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="phone" className="col-sm-2 col-form-label">Phonenumber</label>
          <div className="col-sm-10">
            <input name="phone" type="number" className="form-control" id="phone" value={contact.phone} onChange={handleChange} required />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Add</button>
      </form>
    </div >
  );
}
