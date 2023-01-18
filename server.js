const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const connectDB = require("./backend/mongodb");
const port = process.env.port || 7000;
const cors = require("cors");

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/contacts", require("./backend/routes"));

// app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Server started on port ${port}!!`));
