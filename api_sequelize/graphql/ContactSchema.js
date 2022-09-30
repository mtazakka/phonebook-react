var { buildSchema } = require('graphql');
var models = require('../models/index');
var Contact = require('../models/contact');
const { Sequelize } = require('../models/index');

const schema = buildSchema(`
    input ContactInput {
        name: String
        phone: String
        lat: Float
        lng: Float
        address: String
    }

    type Contact {
        id: Int!
        name: String
        phone: String
        lat: Float
        lng: Float
        address: String
        limit: Int
        offset: Int
    }

    type Query {
        getContacts(name: String, phone: String, offset: Int, limit: Int): [Contact]
    }

    type Mutation {
        createContact(input: ContactInput): Contact
        updateContact(id: Int!, input: ContactInput): Contact
        deleteContact(id: Int!): Contact
    }
`);


const root = {
    getContacts: ({ name, phone, offset, limit }) => {
        try {
            const contacts = models.Contact.findAll({
                where: {
                    [Sequelize.Op.and]: [
                        {
                            name: {
                                [Sequelize.Op.iLike]: '%' + name + '%'
                            }
                        },
                        {
                            phone: {
                                [Sequelize.Op.iLike]: '%' + phone + '%'
                            }
                        }
                    ]
                },
                offset: offset,
                limit: limit
            })
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
            return contact[1]
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
        lat
        lng
        address
    }
    }

    mutation {
    createContact(input: {
        name: "Emir"
        phone: "081221312312"
        lat
        lng
        address
    }) {
        id
        name
        phone
        lat
        lng
        address
    }
    }
    mutation {
    updateContact(input: {
        name: "Emir"
        phone: "081221312312"
        lat
        lng
        address
    }id:"55") {
        id
        name
        phone
        lat
        lng
        address
    }

    mutation updateUser($id: ID!) {
    updateContact(id: $id, input: {
        name: "Emir", 
        phone: "081221312312"
        lat
        lng
        address
    }) {
        id
        name
        phone
        lat
        lng
        address
    }
    }


    mutation {
    deleteContact(id:55) {
    }
}

*/

module.exports = { schema, root }