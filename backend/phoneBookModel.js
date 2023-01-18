const mongoose = require("mongoose");

const phoneBookSchema = mongoose.Schema({
  contact_number: {
    type: Number,
    required: [true, "What is the contact number"],
  },

  contact_name: {
    type: String,
    required: [true, "What is the contact name"],
  },

  contact_email: {
    type: String,
    required: [true, "What is the email"],
  },
});

module.exports = mongoose.model("PhoneBook", phoneBookSchema);
