import { gql } from '@apollo/client';

export const GET_CONTACTS = gql`
query getContact($name: String, $phone: String){
    getContacts(name: $name, phone:$phone ){
        id
        name
        phone
        lat
        lng
        address
    }
}
`;

export const CREATE_CONTACT = gql`
    mutation createContact($contact: ContactInput!){
        createContact(input: $contact) {
        id
        name
        phone
        lat
        lng
        address
        }
    }
`;


export const UPDATE_CONTACT = gql`
    mutation updateContact($id:ID!, $contact: ContactInput!){
        updateContact(id:$id, input: $contact) {
        id
        name 
        phone
        lat
        lng
        address
        }
    }
`;


export const DELETE_CONTACT = gql`
    mutation deleteContact($id: ID!){
        deleteContact(id: $id) {
        __typename
        }
    }
`;