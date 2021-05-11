const mongoose = require('mongoose');

var schema=new mongoose.Schema({
    name: {
        type: String,
        require: true
    },

    email: {
        type: String,
        require: true,
        unique: true
    },

    gender: String,
    status: String

})

const userdb = mongoose.model("userDb",schema);

module.exports = userdb;