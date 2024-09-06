const mongoose = require("mongoose");
require('dotenv').config();

const dbUrl = process.env.DATABASE_URL;
mongoose.connect(dbUrl);

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const Todos = mongoose.model("Todos-list", TodoSchema);

module.exports = {
  Todos,
};
