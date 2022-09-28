var { buildSchema } = require('graphql');
var models = require('../models/index');
const { Sequelize } = require('../models/index');

var schema = buildSchema(`
  input PhonebookInput {
    name: String!
    phone: String!
    latitude: Float
    longitude: Float
    alamat: String
  }

  input GetPhonebookInput {
    name: String!
    phone: String!
    latitude: Float
    longitude: Float
    alamat: String
    limit: Int!
    offset: Int!
  }

  type Phonebook {
    id: Int!
    name: String!
    phone: String!
    latitude: Float
    longitude: Float
    alamat: String
    limit: Int
    offset: Int
  }

  type Query {
    getPhonebooks(name: String, alamat: String, offset: Int, limit: Int, name: String, alamat: String): [Phonebook]
    getFilter(name: String, alamat: String): [Phonebook]
  }

  type Mutation {
    createPhonebook(input: PhonebookInput): Phonebook
    updatePhonebook(id: Int!, input: PhonebookInput): Phonebook
    deletePhonebook(id: Int!): Phonebook
  }
`);

const root = {
    getPhonebooks: async ({ name, alamat, offset, limit }) => {
        try {

            const users = await models.User.findAll({
                where: {
                    [Sequelize.Op.and]: [
                        {
                            name: {
                                [Sequelize.Op.iLike]: '%' + name + '%'
                            }
                        },
                        {
                            alamat: {
                                [Sequelize.Op.iLike]: '%' + alamat + '%'
                            }
                        }
                    ]
                },
                offset: offset,
                limit: limit
            });
            return users;
        } catch (err) {
            throw err
        }
    },
    createPhonebook: async ({ input }) => {
        try {
            //return await service.createPhonebook(input)
            //const users = await models.User.create({raw: true, input})
            const user = await models.User.create(input, { raw: true })
            //console.log('ini tambah',user.map(el => el.get({ plain: true })))
            return user;
        } catch (err) {
            throw err
        }
    },
    updatePhonebook: async ({ id, input }) => {
        try {
            const user = await models.User.update(
                input
                , {
                    where: {
                        id
                    },
                    returning: true,
                    plain: true,
                    raw: true
                })
            console.log('ini edit', user[1])
            //return users.map(el => el.get({ plain: true }));
            return user[1]

        } catch (err) {
            throw err
        }
    },
    deletePhonebook: async ({ id }) => {
        try {
            //const input = await models.Phonebook.findOne({ where: { id } })
            const user = await models.User.destroy({ where: { id } })

            // const user = await models.Phonebook.destroy({ where: { id } })
            //     .then((u) => {return result});
            console.log('ini delete', user)
            return user;
        } catch (err) {
            throw err
        }
    }
};

/*
{
  getPhonebooks(offset: $offset, limit: $limit) {
    id
    name
    phone
    latitude
    longitude
    alamat
  }
}
mutation {
  createPhonebook(input: {
    name: "Heril",
    phone: "089012398764",
    latitude: -5.135399,
    longitude: 119.423790,
    alamat: "Makasar"}) {
    id
    name
    phone
    latitude
    longitude
    alamat
  }
}
mutation {
  updatePhonebook(id: "6", input: {
    name: "Kheiril",
    phone: "089012398760"}) {
    id
    name
    phone
  }
}
mutation {
  deletePhonebook(id: 13) {
  __typename
  }
}
-- query variables delete
{"id": "6305a82f348a5237a12e03ef"}
*/

module.exports = { schema, root }