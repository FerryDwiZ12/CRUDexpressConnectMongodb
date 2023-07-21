const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  nama: { type: String, required: true },
  umur: { type: Number, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
}, {versionKey: false});

const users = mongoose.model("users", usersSchema);

module.exports = users;
