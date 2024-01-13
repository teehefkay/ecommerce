const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    dateCreated: {type: Date, default: Date.now()},
})

const AdminModel = mongoose.model("Admin", AdminSchema);
module.exports = AdminModel;