import { gql } from '@apollo/client';

export const GET_CONTACTS = gql`
{
    getContacts{
        id
        name
        phone
    }
}
`;

export const CREATE_CONTACT = gql`
    mutation createContact($contact: ContactInput!){
        createContact(input: $contact) {
        id
        name
        phone
        }
    }
`;


export const UPDATE_CONTACT = gql`
    mutation updateContact($id:ID!, $contact: ContactInput!){
        updateContact(id:$id, input: $contact) {
        id
        name 
        phone
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