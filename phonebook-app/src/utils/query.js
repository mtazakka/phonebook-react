import { gql } from '@apollo/client';

export const GET_USERS = gql`
query getPhonebooks($name: String, $alamat: String, $offset: Int, $limit: Int) {
  getPhonebooks(name: $name, alamat: $alamat, offset: $offset, limit: $limit) {
    id
    name
    phone
    latitude
    longitude
    alamat
    limit
    offset
  }
}
`;

export const CREATE_USER = gql`
mutation createPhonebook($user: PhonebookInput){
   createPhonebook(input: $user) {
    id
    name
    phone
    latitude
    longitude
    alamat
    }
  }
`;

export const UPDATE_USER = gql`
mutation updatePhonebook($id: Int!, $user: PhonebookInput){
   updatePhonebook(id: $id, input: $user) {
    id
    name
    phone
    latitude
    longitude
    alamat
    }
  }
`;

export const DELETE_USER = gql`
mutation deletePhonebook($id: Int!){
   deletePhonebook(id: $id) {
      __typename
   }
}
`;