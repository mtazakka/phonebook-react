const { Schema, model } = require('mongoose')

const phonebookSchema = new Schema({
    name: String,
    phone: String,
})