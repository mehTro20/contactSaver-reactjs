const asyncHandler = require("express-async-handler");
const { restart } = require("nodemon");

const PhoneBook = require("./phoneBookModel");

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await PhoneBook.find();
  console.log("Get request done");
  res.status(200).json(contacts);
});

const setContact = asyncHandler(async (req, res) => {
  const body = req.body;
  if (!body) {
    res.status(400);
    throw new Error("Error message");
  }
  const contact = await PhoneBook.create({
    contact_number: body.number,
    contact_name: body.name,
    contact_email: body.email,
  });
  res.status(200).json(contact);
  console.log("Something was add to database");
});

const putContact = asyncHandler(async (req, res) => {
  const contacts = await PhoneBook.findById(req.params.id);

  if (!contacts) {
    res.status(400);
    throw new Error("contact not found");
  }
  const updateContact = await PhoneBook.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  console.log("something was changed ", req.body)
  res.status(200).json(updateContact);
});

const deleteContact = asyncHandler(async (req, res) => {
  const contacts = await PhoneBook.findById(req.params.id);

  if (!contacts) {
    res.status(400);
    throw new Error("contact not found");
  }

  await contacts.remove();
  console.log("something was removed")
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getContacts,
  setContact,
  putContact,
  deleteContact,
};
