const express = require("express");
const router = express.Router();
const {
  getContacts,
  setContact,
  putContact,
  deleteContact,
} = require("./controllers");

router.get("/", getContacts);
router.post("/", setContact);

router.put("/:id", putContact);
router.delete("/:id", deleteContact);

module.exports = router;
