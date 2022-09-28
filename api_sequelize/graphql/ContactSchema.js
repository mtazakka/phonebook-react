var { buildSchema } = require('graphql');
var models = require('../models/index');
var Contact = require('../models/contact');

const schema = buildSchema(`
    input ContactInput {
        name: String
        phone: String
    }

    type Contact {
        id: ID
        name: String!
        phone: String!
    }

    type Query {
        getContacts: [Contact]
    }

    type Mutation {
        createContact(input: ContactInput): Contact
        updateContact(id: ID!, input: ContactInput): Contact
        deleteContact(id: ID!): Contact
    }
`);


const root = {
    getContacts: () => {
        try {
            const contacts = models.Contact.findAll()
            return contacts;
        } catch (err) {
            throw err
        }
    },
    createContact: ({ input }) => {
        try {
            const contact = models.Contact.create(input)
            return contact
        } catch (err) {
            throw err
        }
    },
    updateContact: ({ id, input }) => {
        try {
            const contact = models.Contact.update(input,
                {
                    where: { id: id },
                    returning: true,
                    plain: true,
                    raw: true
                })
            console.log('Edit Success')
            return contact
        } catch (err) {
            throw err
        }
    },

    deleteContact: ({ id }) => {
        try {
            const contact = models.Contact.destroy({
                where: {
                    id
                }
            })
            return contact
        } catch (err) {
            throw err
        }
    }
};

/*

    {
    getContacts{
        id
        name
        phone
    }
    }

    mutation {
    createContact(input: {
        name: "Emir"
        phone: "081221312312"
    }) {
        id
        name
        phone
    }
    }
    mutation {
    updateContact(input: {
        name: "Emir"
        phone: "081221312312"
    }id:"55") {
        id
        name
        phone
    }

    mutation updateUser($id: ID!) {
    updateContact(id: $id, input: {name: "Emir", phone: "081221312312"}) {
        id
        name
        phone
    }
    }


    mutation {
    deleteContact(id:55) {
        id
        name
        phone
    }
}

*/

module.exports = { schema, root }